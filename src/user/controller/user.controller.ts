/* eslint-disable */
import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from "../service/user.service";
import {Observable} from "rxjs";
import {UserInterface} from "../models/user.interface";
import {DeleteResult, UpdateResult} from "typeorm";

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    findAll(): Observable<UserInterface[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<UserInterface>{
        return this.userService.findOne(id);
    }

    @Post()
    add(@Body() user: UserInterface): Observable<UserInterface>{
        return this.userService.add(user);
    }

    @Patch(':id')
    updateOne(@Param('id') id: number, @Body() user: UserInterface): Observable<UpdateResult>{
        return this.userService.updateOne(id, user);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<DeleteResult>{
        return this.userService.deleteOne(id);
    }
}
