import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken"
import { TasksController } from "src/tasks/tasks.controller";

@Injectable()

export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        if (req.headers['authorization'] as string) {
            const token:string = req.headers['authorization'].split(" ")[1];
            const verifier = jwt.verify(token, process.env.SECRET_KEY);
            if (verifier) {
                req['user'] = verifier; 
                next()
            } else {
                throw new NotFoundException()
            }
        } else {
            throw new UnauthorizedException()
        }
    }
}