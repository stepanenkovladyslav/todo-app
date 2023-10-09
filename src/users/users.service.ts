import {  Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Users } from "./schemas/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tasks } from "src/tasks/schemas/tasks.schema";



@Injectable()

export class UsersService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }


  async getInfo(id: string, username: string): Promise<Users> {
    try {
      const user = await this.userModel.findOne({ _id: id, username: username});
      if (user) {
        return user
      } else {
        throw new UnauthorizedException()
      }
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw new UnauthorizedException()
      }
      throw new NotFoundException()
    }
  }

  async getTasksForUser(id: string, req: Request): Promise<Array<Tasks>> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (req['user'].username === user.username) {
        return user.tasks
      } else {
        throw new UnauthorizedException()
      }
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw new UnauthorizedException()
      }
      throw new NotFoundException()
    }
  }
}
