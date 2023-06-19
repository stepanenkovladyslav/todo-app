import { Body, Controller, Get, Headers, Param, Post, Req, Session } from "@nestjs/common";
import { UsersService } from "./users.service";
import { createTaskDTO } from "src/tasks/dto/createTask.dto";
import { authorizeDTO } from "src/auth/dto/authorizeDTO";

@Controller("users")

export class UserController {
    constructor(private readonly userService: UsersService) {}
    
    @Get(":id")
    async getInfo(@Param("id") id : string) {
        return this.userService.getInfo(id)
    }

    @Get('tasks/:id')
    async getTasksForUser(@Param("id") id: string) {
        return this.userService.getTasksForUser(id)
    }

}