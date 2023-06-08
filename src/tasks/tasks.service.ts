import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { createTaskDTO } from "./dto/createTask.dto";
import { getOneTaskDTO } from "./dto/getOne.dto";
import { changeTaskInfo } from "./dto/changeTaskInfo.dto";
import { join } from "path";
import { createReadStream } from "fs";
import { addTagToTaskDTO } from "./dto/addTagToTaskDTO.dto";
import { Response } from "express";
import { Tasks } from "./schemas/tasks.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundError } from "rxjs";
import { Tags } from "src/tags/schemas/tags.schema";

@Injectable()

export class TasksService {
    constructor(@InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    @InjectModel(Tags.name) private tagsModel: Model<Tags>)
    {}

    async createTask(dto: createTaskDTO) {
        const task = await this.taskModel.create({ ...dto });
        return task
    }

    async getAll() {
        const tasks = await this.taskModel.find();
        return tasks;
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
        const {tagId, taskId} = body;
        const task = await this.taskModel.findOne({_id: taskId})
        const tag = await this.tagsModel.findOne({_id: tagId})
        if (task && tag) {
            task.tags.push(tag);
            await task.save()
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
        //test
    }

    async changeDeadline(body: changeTaskInfo) {
        const {id, newDeadline} = body;
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
            task.deadline = newDeadline;
            await task.save()
            return task;
        }
        throw new NotFoundException()
        // test
    }

    async getFiles(id: getOneTaskDTO, res: Response) {
        const task: Tasks = await this.taskModel.findOne({_id: id});
        if (task) {
            const filePath = join(process.cwd(), 'uploads', task.file);
            res.sendFile(filePath)
        }
    }

    async addFile(id : getOneTaskDTO, file: Express.Multer.File): Promise<Tasks> {
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
            console.log(file)
            task.file = `${file.filename}.${file.originalname.split(".")[1]}`;
            await task.save()
            return task;
        }
        throw new NotFoundException()
        //test
    }

    async deleteFile(id : getOneTaskDTO) {
        // const task = await this.taskModel.findOne({where: {id}});
        // if (task) {
        //     task.file = null;
        //     await task.save()
        //     return task;
        // }
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
        //test
    }

    async deleteTask(id: getOneTaskDTO) {
        const task = await this.taskModel.findOne({_id: id});
        if (task) {
            task.deleteOne()
            return {message: "Task Deleted"} 
        } 
        throw new NotFoundException()
        //test
    }
}