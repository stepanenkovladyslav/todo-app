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
import { Model, ObjectId } from "mongoose";
import { NotFoundError } from "rxjs";
import { Tags } from "src/tags/schemas/tags.schema";
import { Users } from "src/users/schemas/users.schema";
import { ChangeDescriptionDTO } from "./dto/changeDescription.dto";
import { ChangeDeadlineDTO } from "./dto/changeDeadline.dto";
import { changeCompletedDTO } from "./dto/changeCompleted.dto";
import { RequestWithUser } from "src/globals";

@Injectable()

export class TasksService {
    constructor(@InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    @InjectModel(Tags.name) private tagsModel: Model<Tags>, @InjectModel(Users.name) private usersModel: Model<Users>)
    {}

    async createTask(dto: createTaskDTO, req: RequestWithUser):Promise<Tasks> {
        const task = await this.taskModel.create({ ...dto, user_id: req.user._id });
        req.user.tasks.push(task);
        await req.user.save()
        return task;
    }

    async getAll(req: RequestWithUser): Promise<Array<Tasks>> {
        const userTaskId = req.user.tasks;
        const userTasks = Promise.all(userTaskId.map(async (taskId:Tasks):Promise<Tasks> => {
            const task = await this.taskModel.findOne({_id: taskId});
            return task;
        }))
        return userTasks;
    }

    async getOne(params: getOneTaskDTO):Promise<Tasks> {
        const task = await this.taskModel.findOne({_id:params.id})
        return task;
    }

    async changeTitle(body : changeTitleDTO):Promise<Tasks> {
        const {id, newTitle} = body;
        const task = await this.taskModel.findOne({_id: id});
        task.title = newTitle;
        await task.save()
        return task;
    }

    async changeDescription(body:ChangeDescriptionDTO):Promise<Tasks> {
        const {id, newDescription} = body;
        const task = await this.taskModel.findOne({_id: id});
        task.description = newDescription;
        await task.save()
        return task;
    }

    async changeDeadline(body: ChangeDeadlineDTO):Promise<Tasks> {
        const {id, newDeadline} = body;
        const task = await this.taskModel.findOne({_id: id});
        task.deadline = new Date(newDeadline);
        await task.save()
        return task;
    }

    async getFiles(params: getOneTaskDTO, res: Response):Promise<void> {
        const task = await this.taskModel.findOne({_id: params.id});
        if (task.file !== '') {
          const filePath = path.join(process.cwd(), 'uploads', task.file);
          res.sendFile(filePath)
        } else {
          res.status(200).json({message: 'There is no files attached to the task'});
        }
    }

    async addFile(body : getOneTaskDTO, file: Express.Multer.File, req: RequestWithUser): Promise<Tasks> {
        const {id} = body;
        const isAvailable = req.user.tasks.includes(id as unknown as Tasks);
        if (isAvailable) {
            const task = await this.taskModel.findOne({_id: id});
            task.file = `${file.filename}`;
            await task.save()
            return task;
        } else {
            throw new ForbiddenException()
        }
    }

    async deleteFile(id : getOneTaskDTO):Promise<Tasks> {
        const task = await this.taskModel.findOne({_id: id });
        const filename = task.file;
        fs.unlink(path.join(__dirname, "..", "..", "uploads", filename) , (err:Error) => { if (err) throw new NotFoundException()});
        task.file = "";
        await task.save()
        return task;
    }

    async changeCompletionStatus(body: changeCompletedDTO):Promise<Tasks> {
        const {id, isCompleted} = body 
        const task = await this.taskModel.findOne({_id: id});
        task.isCompleted = isCompleted;
        await task.save()
        return task
    }
}




/*

bad GET http://127.0.0.1:3000/get_my_user_info/user/get?number=3  resp => "Pasha,12,lviv" STATUS 301
good GET http://127.0.0.1:3000/api/v1/user/3   =>  {name:"Pasha",age:12,city:"Lviv"} | XML STATUS 200

// get     http://127.0.0.1:3000/api/v1/user/3  SEND -
   get     http://127.0.0.1:3000/api/v1/user?limit=3&page=2  SEND -
   put     http://127.0.0.1:3000/api/v1/user/3  SEND - JSON
   delete  http://127.0.0.1:3000/api/v1/user/3  SEND - ...
   post    http://127.0.0.1:3000/api/v1/user/   SEND - JSON

   error
   bad  STATUS 200 RESP "Error request"
   good STATUS 401 RESP {message: "Not Authorization"}

*/
