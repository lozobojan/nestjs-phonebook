/* eslint-disable */
import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {from, Observable} from "rxjs";
import {UserInterface} from "../models/user.interface";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    findAll(): Observable<UserInterface[]>{
        return from(this.userRepository.find());
    }

    findOne(id: number): Observable<UserInterface>{
        return from(this.userRepository.findOneBy({id: id}));
    }

    add(user: UserInterface): Observable<UserInterface>{
        return from(this.userRepository.save(user));
    }

    updateOne(id:number, user: UserInterface): Observable<UpdateResult>{
        return from(this.userRepository.update(id, user));
    }

    deleteOne(id:number): Observable<DeleteResult>{
        return from(this.userRepository.delete(id));
    }
}
