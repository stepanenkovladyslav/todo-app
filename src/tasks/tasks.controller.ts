import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "../tagTasks/dto/getOne.dto";
import { changeTitleDTO } from "./dto/changeTaskInfo.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { addTagToTaskDTO } from "../tagTasks/dto/addTagToTaskDTO.dto";
import {Response} from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ChangeDescriptionDTO } from "./dto/changeDescription.dto";
import { ChangeDeadlineDTO } from "./dto/changeDeadline.dto";
import { changeCompletedDTO } from "./dto/changeCompleted.dto";
import { RequestWithUser } from "src/globals";

@Controller("tasks")

export class TasksController {
    constructor(private readonly taskService: TasksService) {}
   @Get()
   async getAll(@Req() req: RequestWithUser) {
    return this.taskService.getAll(req)
   }

   @Get(":id")
   @UsePipes(new ValidationPipe())
   async getOne(@Param() params:getOneTaskDTO) {
    return this.taskService.getOne(params)
   }

   @Get("get-files/:id")
   @UsePipes(new ValidationPipe())
   async getFiles(@Param() params: getOneTaskDTO, @Res() res: Response) {
    return this.taskService.getFiles(params, res)
   }

   @Post("create")
   @UsePipes(new ValidationPipe())
   async createTask(@Body() dto: createTaskDTO, @Req() req: RequestWithUser) {
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
        file: Express.Multer.File, @Req() req: RequestWithUser) {
    return this.taskService.addFile(body, file, req);
   }

   @Put("change-title")
   @UsePipes(new ValidationPipe())
   async changeTitle(@Body() body: changeTitleDTO) {
    return this.taskService.changeTitle(body)
   }

   @Put("change-desc")
   @UsePipes(new ValidationPipe())
   async changeDescription(@Body() body: ChangeDescriptionDTO) {
    return this.taskService.changeDescription(body)
   }

   @Put("change-deadline")
   @UsePipes(new ValidationPipe())
   async changeDeadline(@Body() body: ChangeDeadlineDTO) {
    return this.taskService.changeDeadline(body)
   }

   @Put("complete")
   @UsePipes(new ValidationPipe())
   async changeCompletionStatus(@Body() body: changeCompletedDTO) {
    return this.taskService.changeCompletionStatus(body)
   }

//    @Delete(":id")
//    async deleteTask(@Param("id") id: getOneTaskDTO, @Req() req: Request) {
//     return this.taskService.deleteTask(id, req)
//    }

   @Delete("delete-files/:id") 
   async deleteFiles(@Param("id") id: getOneTaskDTO) {
    return this.taskService.deleteFile(id)
   }

}
