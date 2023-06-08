import { Body, Controller, Get, Headers, Param, Post, Req, Session } from "@nestjs/common";
import { UsersService } from "./users.service";

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
}