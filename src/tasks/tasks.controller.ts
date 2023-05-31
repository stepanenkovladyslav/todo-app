import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "./dto/getOne.dto";

@Controller("tasks")

export class TasksController {
    constructor(private readonly taskService: TasksService) {}

   @Post("create")
   async createTask(@Body() dto: createTaskDTO) {
    return this.taskService.createTask(dto)
   } 

   @Get()
   async getAll() {
    return this.taskService.getAll()
   }

   @Get(":id")
   async getOne(@Param("id") id:getOneTaskDTO) {
    return this.taskService.getOne(id)
   }

   @Delete(":id")
   async deleteTask(@Param("id") id: getOneTaskDTO) {
    return this.taskService.deleteTask(id)
   }

}