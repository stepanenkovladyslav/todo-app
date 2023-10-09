import {  Controller, Get,  Param,  Req, } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")

export class UserController {
  constructor(private readonly userService: UsersService) { }

  @Get(":id")
  async getInfo(@Param("id") id: string, @Req() req: Request) {
    return this.userService.getInfo(id, req['user'].username)
  }

  @Get(':id/tasks')
  async getTasksForUser(@Param("id") id: string, @Req() req: Request) {
    return this.userService.getTasksForUser(id, req)
  }

}
