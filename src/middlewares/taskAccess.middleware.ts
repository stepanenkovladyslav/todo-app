import { ForbiddenException, Inject, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/users/schemas/users.schema";
import { UsersService } from "src/users/users.service";

@Injectable()

export class TaskAccessMiddleware implements NestMiddleware{
    constructor(@InjectModel(Users.name) private readonly userModel : Model<Users>) {}
    async use(req: Request, res: Response, next: (error?: any) => void) {
       if (req.method === "GET" && req['params'].id || req.method === "DELETE" && req['params'].id) {
        const taskId = req['params'].id;
        const user = await this.userModel.findOne({username: req['user'].username});
        const isAvailable = user.tasks.includes(taskId)
        req['user'] = user;
        if (isAvailable) {
            next()
        } else {
            throw new UnauthorizedException()
        }
       } else if (req.method === "GET" && !req['params'].id) {
        const user = await this.userModel.findOne({username: req['user'].username});
        if (user) {
            req['user'] = user; 
            next()
        } else {
            throw new UnauthorizedException()
        }
       } else if (req.method === 'POST' || req.method === "PUT") {
            const user = await this.userModel.findOne({username: req['user'].username});
            req['user'] = user;
            if (req.body['id']) {
                const taskId = req.body['id'];
                const isAvailable = user.tasks.includes(taskId);
                console.log(taskId, isAvailable)
                if (isAvailable) {
                    next()
                } else {
                    throw new UnauthorizedException()
                }
            } else {
                next()
            }
            
       }
    }
}