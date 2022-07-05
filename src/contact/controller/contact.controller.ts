/* eslint-disable */
import {Body, Controller, Get, Post} from '@nestjs/common';
import {ContactService} from "../service/contact.service";
import {Observable} from "rxjs";
import {ContactInterface} from "../models/contact.interface";

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

}
