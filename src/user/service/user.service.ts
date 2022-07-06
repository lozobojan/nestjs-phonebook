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
        return from(this.userRepository.find());
    }

    findOne(id: number): Observable<UserInterface>{
        return from(this.userRepository.findOneBy({id: id}));
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
        return from(this.userRepository.update(id, user));
    }

    deleteOne(id:number): Observable<DeleteResult>{
        return from(this.userRepository.delete(id));
    }
}
