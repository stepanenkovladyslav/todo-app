import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";
import { Tasks } from "src/tasks/schemas/tasks.schema";
import { Users } from "src/users/schemas/users.schema";

@Injectable()

export class cascadeDeleteService {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>, 
    @InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>, 
    @InjectModel(Tags.name) private readonly tagModel: Model<Tags>) {}

    async deleteUser(id: string, req: Request):Promise<{}> {
        try {
            const user = await this.userModel.findOne({_id: id});
            if (req['user'].username === user.username){
                const deletedUsers = await this.userModel.deleteOne({_id: id});
                await this.taskModel.deleteMany({user_id: id})
                await this.tagModel.deleteMany({user_id: id})
                if (deletedUsers.deletedCount > 0) {
                    return {}
                } else {
                  throw new NotFoundException() 
                }
            } else {
              throw new UnauthorizedException()
            }
        } catch(e) {
      if (e instanceof(UnauthorizedException)) {
        throw new UnauthorizedException()
      } else {
        throw new NotFoundException()
      }
    }
  }

    async deleteTask(req: Request, id: string):Promise<{}>{
        try {
            const task = await this.taskModel.findOne({_id: id})
            const user = await this.userModel.findOne({username: req['user'].username});
            const tags = task.tags;
            if (user.tasks.includes(task.id)) {
                const res = await this.taskModel.deleteOne({_id: id});
                const result = await this.userModel.updateOne({username: req['user'].username}, {$pull: {tasks: id}})
                const allResult = await Promise.all(tags.map(async tag => {
                    const tagResult = await this.tagModel.updateOne({_id: tag['_id']}, {$pull: {tasks: id}});
                    return tagResult;
                }));
                return {};
            } else {
                throw new ForbiddenException()
            } 
        } catch(e){ 
            if (e instanceof(ForbiddenException)){
                throw e
            } else {
                throw new NotFoundException()
            }
        }
    }

    async deleteTag(req: Request, id: string):Promise<Array<Tags>> {
        try {
            const tag = await this.tagModel.findOne({_id: id})
            const user = await this.userModel.findOne({username: req['user'].username});
            const tasks = tag.tasks;
            if (user.tags.includes(tag.id)) {
                const res = await this.tagModel.deleteOne({_id: id});
                const userRes = await this.userModel.updateOne({username: req['user'].username}, {$pull: {tags: id}})
                const allResults = await Promise.all(tasks.map(task => this.taskModel.updateOne({_id: task['_id']}, {$pull: {tags: id as unknown as ObjectId}})))
                  return user.tags;    
            } else {
                throw new ForbiddenException()
            }
        } catch(e) {
            if (e instanceof(ForbiddenException)){
                throw e;
            } else {
                throw new NotFoundException()
            }
        }
    }
}
