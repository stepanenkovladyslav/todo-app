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

    async deleteUser(id: string) {
        await this.userModel.deleteOne({_id: id});
        await this.taskModel.deleteMany({user_id: id})
        await this.tagModel.deleteMany({user_id: id})
    }

    async deleteTask(req: Request, id: string) {
        const task = await this.taskModel.findOne({_id: id})
        const user = await this.userModel.findOne({username: req['user'].username});
        const tags = task.tags;
        console.log(task, user);
        if (user.tasks.includes(task)) {
            this.taskModel.deleteOne({_id: id});
            this.userModel.updateOne({username: req['user'].username}, {$pull: {tasks: {_id: id}}})
            tags.forEach(tag => this.tagModel.updateOne({_id: tag['_id']}, {$pull: {tasks: {_id: id}}}))
        }
    }

    async deleteTag(req: Request, id: string) {
        const tag = await this.tagModel.findOne({_id: id})
        const user = await this.userModel.findOne({username: req['user'].username});
        const tasks = tag.tasks;
        console.log(tag, user);
        if (user.tags.includes(tag)) {
            this.tagModel.deleteOne({_id: id});
            this.userModel.updateOne({username: req['user'].username}, {$pull: {tags: {_id: id}}})
            tasks.forEach(task => this.taskModel.updateOne({_id: task['_id']}, {$pull: {tags: {_id: id}}}))
        }
    }
}