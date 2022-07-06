/* eslint-disable */
import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ContactService} from "../contact/service/contact.service";
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ContactService],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '3600s'
                }
            })
        })
    ],
    providers: [AuthService]
})
export class AuthModule {}
