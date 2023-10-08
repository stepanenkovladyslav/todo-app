import { ForbiddenException, Inject, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import multer, { Multer } from "multer";
import { RequestWithUser } from "src/globals";
import { Tasks } from "src/tasks/schemas/tasks.schema";
import { Users } from "src/users/schemas/users.schema";


@Injectable()
export class TaskAccessMiddleware implements NestMiddleware {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }
  async use(req: RequestWithUser, res: Response, next: (error?: any) => void): Promise<void> {
    if (req.method === "GET" && req['params'].id || req.method === "DELETE" && req['params'].id) {
      const taskId = req['params'].id;
      const user = await this.userModel.findOne({ username: req['user'].username });
      const isAvailable = user.tasks.includes(taskId as unknown as Tasks)
      req.user = user;
      if (isAvailable) {
        next()
      } else {
        throw new ForbiddenException()
      }
    } else if (req.method === "GET" && !req['params'].id) {
      const user = await this.userModel.findOne({ username: req['user'].username });
      req.user = user;
      next()
    } else if (req.method === 'POST' || req.method === "PUT") {
      const user = await this.userModel.findOne({ username: req['user'].username });
      req.user = user;
      if (req.body['id']) {
        const taskId = req.body['id'] as string;
        const isAvailable = user.tasks.includes(taskId as unknown as Tasks);
        if (isAvailable) {
          next()
        } else {
          throw new ForbiddenException()
        }
      } else {
        next()
      }
    }
  }
}
