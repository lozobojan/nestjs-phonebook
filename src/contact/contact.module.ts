/* eslint-disable */
import { Module } from '@nestjs/common';
import { ContactService } from './service/contact.service';
import { ContactController } from './controller/contact.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Contact} from "./models/contact.entity";

/* eslint-disable */
@Module({
  providers: [ContactService],
  controllers: [ContactController],
  imports: [
    TypeOrmModule.forFeature([Contact])
  ],
})
export class ContactModule {}
