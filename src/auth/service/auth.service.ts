/* eslint-disable */
import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {User} from "../../user/models/user.entity";
import {from, Observable} from "rxjs";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    generateJWT(user: User): Observable<string>{
        return from(this.jwtService.signAsync(user));
    }

    hashPassword(password: string): Observable<string>{
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(password: string, passwordHash: string): Observable<any | boolean>{
        return from<any | boolean>(bcrypt.compare(password, passwordHash));
    }
}
