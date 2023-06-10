import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
const fs = require("fs")
import * as path from 'path';
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "./dto/getOne.dto";
import { changeTaskInfo } from "./dto/changeTaskInfo.dto";
import { createReadStream } from "fs";
import { addTagToTaskDTO } from "./dto/addTagToTaskDTO.dto";
import { Response } from "express";
import { Tasks } from "./schemas/tasks.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundError } from "rxjs";
import { Tags } from "src/tags/schemas/tags.schema";
import { Users } from "src/users/schemas/users.schema";

@Injectable()

export class TasksService {
    constructor(@InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    @InjectModel(Tags.name) private tagsModel: Model<Tags>, @InjectModel(Users.name) private usersModel: Model<Users>)
    {}

    async createTask(dto: createTaskDTO, req: Request) {
        const task = await this.taskModel.create({ ...dto });
        req['user'].tasks.push(task);
        await req['user'].save()
        return task
    }

    async getAll(req: Request) {
        const userTaskId = req['user'].tasks;
        const userTasks = Promise.all(userTaskId.map(async (taskId:string, idx:number) => {
            const task = await this.taskModel.findOne({_id: taskId});
            return task;
        }))
        return userTasks;
    }

    async getOne(id: getOneTaskDTO) {
        const task = await this.taskModel.findOne({_id:id})
        if (task) {
            return task
        } 
        throw new NotFoundException()
    }

    async getTagsBy(id:getOneTaskDTO) {
       const task = await this.taskModel.findOne({_id: id}) 
       if (task) {
        const tags = task.tags;
        const allTags = Promise.all(tags.map(( async tagId => {
            const tag = await this.tagsModel.findOne({_id: tagId});
            return tag
        })))
        return allTags
       } 
       throw new NotFoundException()
    }
    
    async addTag(body: addTagToTaskDTO) {
        const {tagId, id} = body;
        const task = await this.taskModel.findOne({_id: id})
        const tag = await this.tagsModel.findOne({_id: tagId})
        if (task && tag) {
            task.tags.push(tag);
            tag.tasks.push(task)
            await task.save()
            await tag.save()
            return task
        }
    }

    async changeTitle(body : changeTaskInfo) {
        const {id, newTitle} = body;
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
            task.title = newTitle;
            await task.save()
            return task;
        }  
        throw new NotFoundException()
    }

    async changeDescription(body:changeTaskInfo) {
        const {id, newDescription} = body;
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
            task.description = newDescription;
            await task.save()
            return task;
        } 
        throw new NotFoundException()
    }

    async changeDeadline(body: changeTaskInfo) {
        const {id, newDeadline} = body;
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
            task.deadline = new Date(newDeadline);
            console.log(task)
            await task.save()
            return task;
        }
        throw new NotFoundException()
    }

    async getFiles(id: getOneTaskDTO, res: Response) {
        const task: Tasks = await this.taskModel.findOne({_id: id});
        if (task) {
            const filePath = path.join(process.cwd(), 'uploads', task.file);
            res.sendFile(filePath)
        }
    }

    async addFile(body : getOneTaskDTO, file: Express.Multer.File, req: Request): Promise<Tasks> {
        const {id} = body;
        const isAvailable = req['user'].tasks.includes(id);
        if (isAvailable) {
            const task = await this.taskModel.findOne({_id: id});
            if (task) {
                task.file = `${file.filename}`;
                await task.save()
                return task;
            }
            throw new NotFoundException()
        } else {
            throw new UnauthorizedException()
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

    async changeCompletionStatus(body: changeTaskInfo) {
       const {id, isCompleted} = body 
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
            task.isCompleted = isCompleted;
            await task.save()
            return task
        } 
        throw new NotFoundException()
    }

    async deleteTask(id: getOneTaskDTO, req: Request) {
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
           await task.deleteOne()
            await this.usersModel.updateOne({_id: req['user'].id}, { $pull: {tasks: task._id}})
            await this.tagsModel.updateMany({}, {$pull: {tasks: task._id}})
            return {message: "Task Deleted"} 
        } 
        throw new NotFoundException()
    }
}