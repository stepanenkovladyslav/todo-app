import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "./user.model";
import { UsersService } from "./users.service";
import { createAccountDTO } from "./dto/createAccountDTO.dto";

@Controller("users")

export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Post('create')
    async createAccount(@Body() body: createAccountDTO) {
        return this.userService.createAccount(body)
    }

    @Get(":id")
    async getInfo(@Param("id") id : number) {
        return this.userService.getInfo(id)
    }

}