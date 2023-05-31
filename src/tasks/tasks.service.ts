import { Inject, Injectable } from "@nestjs/common";
import { createTaskDTO } from "./dto/createTask.dto";
import { Tasks } from "./tasks.model";
import { Model } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()

export class TasksService {
    constructor(@InjectModel(Tasks) private taskModel:typeof Tasks) {}

    async createTask(dto: createTaskDTO) {
        const task = await this.taskModel.create({ ...dto });
        return task
    }

    getAll() {

    }

    getOne() {

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

    deleteTask() {

    }

}