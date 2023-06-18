import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
const fs = require("fs")
import * as path from 'path';
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "../tagTasks/dto/getOne.dto";
import {  changeTitleDTO } from "./dto/changeTaskInfo.dto";
import { createReadStream } from "fs";
import { addTagToTaskDTO } from "../tagTasks/dto/addTagToTaskDTO.dto";
import { Response } from "express";
import { Tasks } from "./schemas/tasks.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundError } from "rxjs";
import { Tags } from "src/tags/schemas/tags.schema";
import { Users } from "src/users/schemas/users.schema";
import { ChangeDescriptionDTO } from "./dto/changeDescription.dto";
import { ChangeDeadlineDTO } from "./dto/changeDeadline.dto";
import { changeCompletedDTO } from "./dto/changeCompleted.dto";

@Injectable()

export class TasksService {
    constructor(@InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    @InjectModel(Tags.name) private tagsModel: Model<Tags>, @InjectModel(Users.name) private usersModel: Model<Users>)
    {}

    async createTask(dto: createTaskDTO, req: Request) {
        try {
            const task = await this.taskModel.create({ ...dto, user_id: req['user']._id });
            req['user'].tasks.push(task);
            await req['user'].save()
            return task
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async getAll(req: Request) {
        try {
        const userTaskId = req['user'].tasks;
        const userTasks = Promise.all(userTaskId.map(async (taskId:string, idx:number) => {
            const task = await this.taskModel.findOne({_id: taskId});
            return task;
        }))
        return userTasks;
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async getOne(id: getOneTaskDTO) {
        try {
            const task = await this.taskModel.findOne({_id:id})
            return task
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async changeTitle(body : changeTitleDTO) {
        try {
            const {id, newTitle} = body;
            const task = await this.taskModel.findOne({_id: id});
            task.title = newTitle;
            await task.save()
            return task;
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async changeDescription(body:ChangeDescriptionDTO) {
        try {
            const {id, newDescription} = body;
            const task = await this.taskModel.findOne({_id: id});
            task.description = newDescription;
            await task.save()
            return task;
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async changeDeadline(body: ChangeDeadlineDTO) {
        try {
            const {id, newDeadline} = body;
            const task = await this.taskModel.findOne({_id: id});
            task.deadline = new Date(newDeadline);
            console.log(task)
            await task.save()
            return task;
        } catch(e) {
            throw new InternalServerErrorException() 
        }
    }

    async getFiles(params: getOneTaskDTO, res: Response) {
        try {
            const task: Tasks = await this.taskModel.findOne({_id: params.id});
            const filePath = path.join(process.cwd(), 'uploads', task.file);
            res.sendFile(filePath)
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async addFile(body : getOneTaskDTO, file: Express.Multer.File, req: Request): Promise<Tasks> {
        try {
            const {id} = body;
            const isAvailable = req['user'].tasks.includes(id);
            if (isAvailable) {
                const task = await this.taskModel.findOne({_id: id});
                if (task) {
                    task.file = `${file.filename}`;
                    await task.save()
                    return task;
                } else {
                    throw new NotFoundException()
                }
            } else {
                console.log("first")
                throw new ForbiddenException()
            }
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async deleteFile(id : getOneTaskDTO) {
        const task = await this.taskModel.findOne({_id: id });
        if (task) {
            const filename = task.file;
            fs.unlink(path.join(__dirname, "..", "..", "uploads", filename) , (err) => { if (err) throw new NotFoundException()});
            task.file = "";
            await task.save()
            return task;
        }
    }

    async changeCompletionStatus(body: changeCompletedDTO) {
       try {
            const {id, isCompleted} = body 
            const task = await this.taskModel.findOne({_id: id});
            task.isCompleted = isCompleted;
            await task.save()
            return task
       } catch(e) {
            throw new InternalServerErrorException()
       }
    }
}