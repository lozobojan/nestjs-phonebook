/* eslint-disable */
import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {catchError, from, map, Observable, switchMap, throwError} from "rxjs";
import {UserInterface} from "../models/user.interface";
import {AuthService} from "../../auth/service/auth.service";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private authService: AuthService
    ) {}

    findAll(): Observable<UserInterface[]>{
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
              users.forEach((user) => { delete user.password });
              return users;
            })
        );
    }

    findOne(id: number): Observable<UserInterface>{
        // map user: remove password from it
        return from(this.userRepository.findOneBy({id: id})).pipe(
            map( (user: User) => {
                const {password, ...otherData} = user;
                return otherData;
            }),
            catchError(err => throwError(err))
        );
    }

    add(user: UserInterface): Observable<UserInterface>{
        // save hashed password instead of plain
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new User();
                newUser.name = user.name;
                newUser.email = user.email;
                newUser.password = passwordHash;

                // save newUser and return without password
                return from(this.userRepository.save(newUser)).pipe(
                    map( (newUser: User) => {
                        const {password, ...otherData} = newUser;
                        return otherData;
                    }),
                    catchError(err => throwError(err))
                )
            })
        );
    }

    updateOne(id:number, user: UserInterface): Observable<UpdateResult>{
        // prevent user from updating email and/or password
        delete user.email;
        delete user.password;

        return from(this.userRepository.update(id, user));
    }

    deleteOne(id:number): Observable<DeleteResult>{
        return from(this.userRepository.delete(id));
    }

    login(user: User):Observable<string>{
        return this.validateUser(user.email, user.password).pipe(
            switchMap( (user) => user ? this.authService.generateJWT(user) : "Wrong credentials" )
        );
    }

    validateUser(email: string, password: string): Observable<User>{
        return this.findByEmail(email).pipe(
            switchMap( (user: User) =>
                this.authService.comparePasswords(password, user.password).pipe(
                    map( (passwordsMatch) => {
                        if (passwordsMatch) return user;
                        else throw Error();
                    })
                )
            )
        );
    }

    findByEmail(email: string): Observable<User>{
        return from(this.userRepository.findOneBy({email: email}));
    }
}
