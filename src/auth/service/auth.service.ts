/* eslint-disable */
import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {User} from "../../user/models/user.entity";
import {from, Observable} from "rxjs";

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    generateJWT(user: User): Observable<string>{
        return from(this.jwtService.signAsync(user));
    }


}
