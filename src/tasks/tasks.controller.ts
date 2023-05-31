import { Body, Controller, Get, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/createTask.dto";

@Controller("tasks")

export class TasksController {
    constructor(private readonly taskService: TasksService) {}
   @Post("create")
   async createTask(@Body() dto: createTaskDTO) {
    return this.taskService.createTask(dto)
   } 
}