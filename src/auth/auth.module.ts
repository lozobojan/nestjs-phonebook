/* eslint-disable */
import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import {UserService} from "../user/service/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/models/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '3600s'
                }
            })
        })
    ],
    providers: [AuthService, UserService],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
