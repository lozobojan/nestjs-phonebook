/* eslint-disable */
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {AuthService} from "../auth/service/auth.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [UserService, AuthService],
  controllers: [UserController],
  imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule
  ]
})
export class UserModule {}
