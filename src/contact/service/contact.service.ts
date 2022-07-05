/* eslint-disable */
import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {Contact} from "../models/contact.entity";
import {ContactInterface} from "../models/contact.interface";
import {from, Observable} from "rxjs";

@Injectable()
export class ContactService {

    constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>) {}

    add(contact: ContactInterface): Observable<ContactInterface>{
        return from(this.contactRepository.save(contact));
    }

    findAll(): Observable<ContactInterface[]> {
        return from(this.contactRepository.find());
    }

    findOne(id: number): Observable<ContactInterface> {
        return from(this.contactRepository.findOneBy({id: id}));
    }
}
