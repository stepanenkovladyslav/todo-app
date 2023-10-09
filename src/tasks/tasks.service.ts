import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path';
import { createTaskDTO } from "./dto/createTask.dto";
import { changeTitleDTO } from "./dto/changeTaskInfo.dto";
import { Response } from "express";
import { Tasks } from "./schemas/tasks.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";
import { Users } from "src/users/schemas/users.schema";
import { changeDescriptionDTO } from "./dto/changeDescription.dto";
import { changeDeadlineDTO } from "./dto/changeDeadline.dto";
import { changeStatusDTO } from "./dto/changeStatus.dto";
import { RequestWithUser } from "src/globals";


enum TaskField {
  title = "title",
  description = "description",
  deadline = "deadline",
  status = "isCompleted"
}

type TaskFieldValue = string | boolean | Date;

@Injectable()

export class TasksService {
  constructor(@InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    @InjectModel(Tags.name) private tagsModel: Model<Tags>, @InjectModel(Users.name) private usersModel: Model<Users>) { }

  async updateTaskField (id: string, field:TaskField, newValue: TaskFieldValue) {
    return await this.taskModel.findByIdAndUpdate(id, {[field]: newValue}, {new: true})
  }
  
  async createTask(dto: createTaskDTO, req: RequestWithUser): Promise<Tasks> {
    const task = await this.taskModel.create({ ...dto, user_id: req.user._id });
    req.user.tasks.push(task);
    await req.user.save()
    return task;
  }

  async getAll(req: RequestWithUser): Promise<Array<Tasks>> {
    const userTaskId = req.user.tasks;
    const userTasks = Promise.all(userTaskId.map(async (taskId: Tasks): Promise<Tasks> => {
      const task = await this.taskModel.findById(taskId);
      return task;
    }))
    return userTasks;
  }

  async getOne(id: string): Promise<Tasks> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async changeTitle(id: string, body: changeTitleDTO): Promise<Tasks> {
    const { newTitle } = body;
    const updatedTask = await this.updateTaskField(id, TaskField.title, newTitle);
    return updatedTask;
  }

  async changeDescription(id: string, body: changeDescriptionDTO): Promise<Tasks> {
    const { newDescription } = body;
    const updatedTask = await this.updateTaskField(id, TaskField.description, newDescription);
    return updatedTask;
  }

  async changeDeadline(id: string, body: changeDeadlineDTO): Promise<Tasks> {
    const { newDeadline } = body;
    const updatedTask = await this.updateTaskField(id, TaskField.deadline, newDeadline);
    return updatedTask;
  }

  async getFiles(id: string): Promise<string> {
    const task = await this.taskModel.findById(id);
    if (task.file !== '') {
      return path.join(process.cwd(), 'uploads', task.file);
    } else {
      return null;
    }
  }

  async addFile(id: string, file: Express.Multer.File, req: RequestWithUser): Promise<Tasks> {
    const isAvailable = req.user.tasks.includes(id as unknown as Tasks);
    if (isAvailable) {
      const task = await this.taskModel.findById(id);
      task.file = `${file.filename}`;
      await task.save()
      return task;
    } else {
      throw new ForbiddenException()
    }
  }

  async deleteFile(id: string): Promise<Tasks> {
    const task = await this.taskModel.findById(id);
    const filename = task.file;
    if (!filename) {
      throw new NotFoundException(`The file with ${id} was not found`)
    }
      fs.unlink(path.join(__dirname, "..", "..", "uploads", filename), (err) => { 
        if (err) {
          throw new InternalServerErrorException('Internal Server Error')
        }
      })

    task.file = "";
    await task.save()
    return;
  }

  async changeCompletionStatus(id: string, body: changeStatusDTO): Promise<Tasks> {
    const { newStatus } = body
    const updatedTask = await this.updateTaskField(id, TaskField.status, newStatus);
    return updatedTask;
  }
}


