import { Injectable, NotFoundException } from "@nestjs/common";
import { Users } from "./schemas/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";



@Injectable()

export class UsersService {
    constructor(@InjectModel(Users.name) private readonly userModel : Model<Users>) {}

   
    async getInfo(id: number) {
       const user = await this.userModel.findOne({_id: id}); 
       if (user) {
        return user
       }
       throw new NotFoundException() 
    }

    async getTasksForUser(id: number) {
        const user = await this.userModel.findOne({_id: id});
        if(user) {
            return user.tasks
        }
        throw new NotFoundException()
    }

    

   
}