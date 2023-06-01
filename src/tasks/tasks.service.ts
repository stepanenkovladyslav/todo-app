import { Inject, Injectable } from "@nestjs/common";
import { createTaskDTO } from "./dto/createTask.dto";
import { Tasks } from "./tasks.model";
import { Model, where } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { getOneTaskDTO } from "./dto/getOne.dto";
import { changeTaskInfo } from "./dto/changeTaskInfo.dto";
import { Tags } from "src/tags/tags.model";

@Injectable()

export class TasksService {
    constructor(@InjectModel(Tasks) private taskModel:typeof Tasks) {}

    async createTask(dto: createTaskDTO) {
        const task = await this.taskModel.create({ ...dto });
        return task
    }

    async getAll() {
        const tasks = await this.taskModel.findAll();
        return tasks;
    }

    async getOne(id: getOneTaskDTO) {
        const task = await this.taskModel.findOne({where: {id}})
        if (task) {
            return task
        } else {
            return {message: "There is no such task"}
        }
    }

    async getTagsBy(id:getOneTaskDTO) {
       const task = await this.taskModel.findOne({where: {id}, include: [{model: Tags, through:{attributes: []}},]}) 
       if (task) {
        const tags = task.Tags
        return tags
       }
    }

    async changeTitle(body : changeTaskInfo) {
        const {id, newTitle} = body;
        const task = await this.taskModel.findOne({where: {id}});
        if (task) {
            task.title = newTitle;
            await task.save()
            return task;
        }  else {
            return {message: "There is no such task"}
        }
    }

    async changeDescription(body:changeTaskInfo) {
        const {id, newDescription} = body;
        const task = await this.taskModel.findOne({where: {id}});
        if (task) {
            task.description = newDescription;
            await task.save()
            return task;
        } else {
            return {message: "There is no such task"}
        }
        
    }

    async changeDeadline(body: changeTaskInfo) {
        const {id, newDeadline} = body;
        const task = await this.taskModel.findOne({where : {id}});
        if (task) {
            task.date = newDeadline;
            await task.save()
            return task;
        } else {
            return {message: "There is no such task"}
        }
        
    }

    addFile() {

    }

    deleteFile() {

    }

    async changeCompletionStatus(body: changeTaskInfo) {
       const {id, isCompleted} = body 
        const task = await this.taskModel.findOne({where : {id}});
        if (task) {
            task.isCompleted = isCompleted;
            await task.save()
            return task
        } else {
            return {message: "There is no such task"}
        }
    }

    async deleteTask(id: getOneTaskDTO) {
        const task = await this.taskModel.findOne({where: {id}});
        if (task) {
            task.destroy()
            return {message: "Task Deleted"} 
        } else {
            return {message: "There is no such task"}
        }
    }
}