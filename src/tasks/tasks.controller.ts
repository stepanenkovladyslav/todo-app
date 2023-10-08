import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Patch, Post, Put, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/createTask.dto";
import { changeTitleDTO } from "./dto/changeTaskInfo.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { changeDescriptionDTO } from "./dto/changeDescription.dto";
import { changeDeadlineDTO } from "./dto/changeDeadline.dto";
import { changeStatusDTO } from "./dto/changeStatus.dto";
import { RequestWithUser } from "src/globals";

@Controller("tasks")

export class TasksController {
  constructor(private readonly taskService: TasksService) { }
  @Get()
  async getAll(@Req() req: RequestWithUser) {
    return this.taskService.getAll(req)
  }

  @Get(":id")
  @UsePipes(new ValidationPipe())
  async getOne(@Param("id") id: string) {
    return this.taskService.getOne(id)
  }

  @Get(":id/file")
  @UsePipes(new ValidationPipe())
  async getFiles(@Param("id") id: string, @Res() res: Response) {
    return this.taskService.getFiles(id, res)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() dto: createTaskDTO, @Req() req: RequestWithUser) {
    return this.taskService.createTask(dto, req)
  }

  @Post(":id/file")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads", filename: (req, file, cb) => {
        const randomName = Date.now() + Math.round(Math.random() * 200);
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async addFile(@Param("id") id: string,
    @UploadedFile(new ParseFilePipe(
      {
        validators: [
          new FileTypeValidator({ fileType: /^(text\/plain|application\/pdf)$/ })
        ]
      }))
    file: Express.Multer.File, @Req() req: RequestWithUser) {
    return this.taskService.addFile(id, file, req);
  }

  @Patch(":id/title")
  @UsePipes(new ValidationPipe())
  async changeTitle(@Param("id") id: string, @Body() body: changeTitleDTO) {
    return this.taskService.changeTitle(id, body)
  }

  @Patch(":id/description")
  @UsePipes(new ValidationPipe())
  async changeDescription(@Param("id") id: string, @Body() body: changeDescriptionDTO) {
    return this.taskService.changeDescription(id, body)
  }

  @Patch(":id/deadline")
  @UsePipes(new ValidationPipe())
  async changeDeadline(@Param("id") id: string, @Body() body: changeDeadlineDTO) {
    return this.taskService.changeDeadline(id, body)
  }

  @Patch(":id/status")
  @UsePipes(new ValidationPipe())
  async changeCompletionStatus(@Param("id") id: string, @Body() body: changeStatusDTO) {
    return this.taskService.changeCompletionStatus(id, body)
  }

  @Delete(":id/file")
  async deleteFiles(@Param("id") id: string) {
    return this.taskService.deleteFile(id)
  }

}
