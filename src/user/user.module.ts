/* eslint-disable */
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user.entity";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
      TypeOrmModule.forFeature([User])
  ]
})
export class UserModule {}
