import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "../tagTasks/dto/getOne.dto";
import { changeTaskInfo } from "./dto/changeTaskInfo.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { addTagToTaskDTO } from "../tagTasks/dto/addTagToTaskDTO.dto";
import {Response} from "express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("tasks")

export class TasksController {
    constructor(private readonly taskService: TasksService) {}
   @Get()
   async getAll(@Req() req: Request) {
    return this.taskService.getAll(req)
   }

   @Get(":id")
   async getOne(@Param("id") id:getOneTaskDTO) {
    return this.taskService.getOne(id)
   }

   @Get("get-files/:id")
   async getFiles(@Param("id") id: getOneTaskDTO, @Res() res: Response) {
    return this.taskService.getFiles(id, res)
   }

   @Post("create")
   async createTask(@Body() dto: createTaskDTO, @Req() req: Request) {
    return this.taskService.createTask(dto, req)
   } 

   @Post("add-file")
   @UseInterceptors(FileInterceptor('file', {storage: diskStorage({destination: "./uploads", filename: (req, file, cb) => {
    const randomName = Date.now() + Math.round(Math.random() * 200);
    cb(null, `${randomName}${extname(file.originalname)}`)
   }})}))
   async addFile( @Body() body:getOneTaskDTO, 
    @UploadedFile(new ParseFilePipe(
        {validators: [
            new FileTypeValidator({fileType: /^(text\/plain|application\/pdf)$/ })
        ]})) 
        file: Express.Multer.File, @Req() req: Request) {
    return this.taskService.addFile(body, file, req);
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
   async deleteTask(@Param("id") id: getOneTaskDTO, @Req() req: Request) {
    return this.taskService.deleteTask(id, req)
   }

   @Delete("delete-files/:id") 
   async deleteFiles(@Param("id") id: getOneTaskDTO) {
    return this.taskService.deleteFile(id)
   }

}