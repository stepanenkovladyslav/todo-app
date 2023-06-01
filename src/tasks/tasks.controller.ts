import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "./dto/getOne.dto";
import { changeTaskInfo } from "./dto/changeTaskInfo.dto";

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

   @Get("/get-tags/:id")
   async getTagsBy(@Param("id") id: getOneTaskDTO) {
    return this.taskService.getTagsBy(id)
   }

   @Put("change-title")
   async changeTitle(@Body() body: changeTaskInfo) {
    return this.taskService.changeTitle(body)
   }

   @Put("change-desc")
   async changeDescription(@Body() body: changeTaskInfo) {
    return this.taskService.changeDescription(body)
   }

   @Put("change-deadline")
   async changeDeadline(@Body() body: changeTaskInfo) {
    return this.taskService.changeDeadline(body)
   }

   @Put("complete")
   async changeCompletionStatus(@Body() body: changeTaskInfo) {
    return this.taskService.changeCompletionStatus(body)
   }

   @Delete(":id")
   async deleteTask(@Param("id") id: getOneTaskDTO) {
    return this.taskService.deleteTask(id)
   }

}