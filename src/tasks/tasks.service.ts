import { Inject, Injectable } from "@nestjs/common";
import { createTaskDTO } from "./dto/createTask.dto";
import { Tasks } from "./tasks.model";
import { Model, where } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { getOneTaskDTO } from "./dto/getOne.dto";

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

    changeTitle() {

    }

    changeDescription() {

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