/* eslint-disable */
import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "../../user/service/user.service";
import {User} from "../../user/models/user.entity";
import {map, Observable} from "rxjs";

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService
    ) {}

    @Post('login')
    login(@Body() user: User): Observable<Object>{
        return this.userService.login(user).pipe(
            map( (jwt: string) => {
                return {accessToken: jwt};
            })
        );
    }

}
