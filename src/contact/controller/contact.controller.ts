/* eslint-disable */
import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {ContactService} from "../service/contact.service";
import {from, Observable} from "rxjs";
import {ContactInterface} from "../models/contact.interface";
import {UpdateResult} from "typeorm";

@Controller('contacts')
export class ContactController {

    constructor(private contactService: ContactService) {
    }

    @Get()
    findAll(): Observable<ContactInterface[]>{
        return this.contactService.findAll();
    }

    @Post()
    add(@Body() contact: ContactInterface): Observable<ContactInterface>{
        return this.contactService.add(contact);
    }

    @Get('/:id')
    findOne(@Param('id') id: number): Observable<ContactInterface>{
        return this.contactService.findOne(id);
    }

    @Patch('/:id')
    updateOne(@Param('id') id: number, @Body() contact: ContactInterface): Observable<UpdateResult>{
        return this.contactService.updateOne(id, contact);
    }

}
