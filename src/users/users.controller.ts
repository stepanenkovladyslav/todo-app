import { Body, Controller, Get, Headers, Param, Post, Req, Session } from "@nestjs/common";
import { UsersService } from "./users.service";
import { createAccountDTO } from "./dto/createAccountDTO.dto";
import { Request } from "express";
import { loginDTO } from "./dto/loginDTO";
import { authorizeDTO } from "./dto/authorizeDTO";

@Controller("users")

export class UserController {
    constructor(private readonly userService: UsersService) {}
    
    @Get(":id")
    async getInfo(@Param("id") id : number) {
        return this.userService.getInfo(id)
    }

    @Get('tasks/:id')
    async getTasksForUser(@Param("id") id: number) {
        return this.userService.getTasksForUser(id)
    }
    
    @Post('create')
    async createAccount(@Body() body: createAccountDTO ) {
        return this.userService.createAccount(body)
    }
    
    @Post('login')
    async login(@Body() body: loginDTO) {
        return this.userService.login(body)
    }

    @Post('authorize')
    async authorize(@Headers() headers: authorizeDTO) {
        return this.userService.authorize(headers)
    }
}