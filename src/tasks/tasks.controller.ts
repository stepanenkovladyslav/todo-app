import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "./dto/getOne.dto";
import { changeTaskInfo } from "./dto/changeTaskInfo.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { addTagToTaskDTO } from "./dto/addTagToTaskDTO.dto";

@Controller("tasks")

export class TasksController {
    constructor(private readonly taskService: TasksService) {}
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

   @Get("get-files/:id")
   async getFiles(@Param("id") id: getOneTaskDTO, @Res() res: Response) {
    return this.taskService.getFiles(id, res)
   }

   @Post("create")
   async createTask(@Body() dto: createTaskDTO) {
    return this.taskService.createTask(dto)
   } 

   @Post("add-file/:id")
   @UseInterceptors(FileInterceptor('file', {dest: "./uploads"}))
   async addFile(@Param("id") id:getOneTaskDTO, 
    @UploadedFile(new ParseFilePipe(
        {validators: [
            new FileTypeValidator({fileType: /^(text\/plain|application\/pdf)$/ })
        ]})) 
        file: Express.Multer.File) {
    return this.taskService.addFile(id, file);
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

   @Put("add-tag")
   async addTag(@Body() body: addTagToTaskDTO) {
    return this.taskService.addTag(body);
   }

   @Delete(":id")
   async deleteTask(@Param("id") id: getOneTaskDTO) {
    return this.taskService.deleteTask(id)
   }

   @Delete("delete-files/:id") 
   async deleteFiles(@Param("id") id: getOneTaskDTO) {
    return this.taskService.deleteFile(id)
   }

}