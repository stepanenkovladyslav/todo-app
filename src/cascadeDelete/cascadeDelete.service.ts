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
        console.log(task)
        const user = await this.userModel.findOne({username: req['user'].username});
        const tags = task.tags;
        if (user.tasks.includes(task.id)) {
            try {
                const res = await this.taskModel.deleteOne({_id: id});
                const result = await this.userModel.updateOne({username: req['user'].username}, {$pull: {tasks: id}})
                const allResult = await Promise.all(tags.map(async tag => {
                    const tagResult = await this.tagModel.updateOne({_id: tag['_id']}, {$pull: {tasks: id}});
                    console.log('Update Tag Result:', tagResult);
                    return tagResult;
                }));
                return {message: 'Deleted successfully'}
            } catch(err) {
                console.log("first")
                console.log(err)
            }
        }
        return {message: 'Deleted unsuccessfully'}
    }

    async deleteTag(req: Request, id: string) {
        const tag = await this.tagModel.findOne({_id: id})
        const user = await this.userModel.findOne({username: req['user'].username});
        const tasks = tag.tasks;
        if (user.tags.includes(tag.id)) {
            const res = await this.tagModel.deleteOne({_id: id});
            const userRes = await this.userModel.updateOne({username: req['user'].username}, {$pull: {tags: id}})
            const allResults = await Promise.all(tasks.map(task => this.taskModel.updateOne({_id: task['_id']}, {$pull: {tags: id}})))
            return {message: "Deleted successfully"}
        }
    }
}