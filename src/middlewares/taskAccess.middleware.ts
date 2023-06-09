import { ForbiddenException, Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/users/schemas/users.schema";
import { UsersService } from "src/users/users.service";

@Injectable()

export class TaskAccessMiddleware implements NestMiddleware{
    constructor(@InjectModel(Users.name) private readonly userModel : Model<Users>) {}
    async use(req: Request, res: Response, next: (error?: any) => void) {
       if (req.method === "GET" || req.method === "DELETE" && req['params']) {
        const taskId = req['params'].id;
        const user = await this.userModel.findOne({username: req['user'].username});
        const isAvailable = user.tasks.includes(taskId)
        if (isAvailable) {
            next()
        } 
        throw new UnauthorizedException()
       }
    }
}