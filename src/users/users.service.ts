import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Users } from "./schemas/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as jwt from "jsonwebtoken"
import { createTaskDTO } from "src/tasks/dto/createTask.dto";
import { Tasks } from "src/tasks/schemas/tasks.schema";
import { Mode } from "fs";
import { authorizeDTO } from "src/auth/dto/authorizeDTO";



@Injectable()

export class UsersService {
    constructor(@InjectModel(Users.name) private readonly userModel : Model<Users>) {}

   
    async getInfo(id: string) {
        try {
            const user = await this.userModel.findOne({_id: id}); 
            return user
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getTasksForUser(id: string) {
        try{
            const user = await this.userModel.findOne({_id: id});
            return user.tasks
        } catch(e) {
            throw new NotFoundException()
        } 
    }
}
