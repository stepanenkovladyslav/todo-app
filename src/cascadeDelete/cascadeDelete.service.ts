import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";
import { Tasks } from "src/tasks/schemas/tasks.schema";
import { Users } from "src/users/schemas/users.schema";

@Injectable()

export class cascadeDeleteService {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>, 
    @InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>, 
    @InjectModel(Tags.name) private readonly tagModel: Model<Tags>) {}

    async deleteUser(id: number) {
        
    }
}