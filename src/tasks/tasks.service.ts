import { Inject, Injectable } from "@nestjs/common";
import { createTaskDTO } from "./dto/createTask.dto";
import { Tasks } from "./tasks.model";
import { Model, where } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { getOneTaskDTO } from "./dto/getOne.dto";
import { changeTaskInfo } from "./dto/changeTaskInfo.dto";

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
        return task
    }

    getTagsBy() {

    }

    async changeTitle(body : changeTaskInfo) {
        const {id, newTitle} = body;
        const task = await this.taskModel.findOne({where: {id}});
        task.title = newTitle;
        await task.save()
        return task;
    }

    async changeDescription(body:changeTaskInfo) {
        const {id, newDescription} = body;
        const task = await this.taskModel.findOne({where: {id}});
        task.description = newDescription;
        await task.save()
        return task;
    }

    changeDeadline() {

    }

    addFile() {

    }

    deleteFile() {

    }

    completeTask() {
        
    }

    async deleteTask(id: getOneTaskDTO) {
        const task = await this.taskModel.findOne({where: {id}});
        if (task) {
            task.destroy()
        }
        return {message: "Task Deleted"} 
    }

}