import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken"
import { TasksController } from "src/tasks/tasks.controller";


@Injectable()



export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void):void {
        if (req.headers['authorization'] as string) {
            try {
                const token:string = req.headers['authorization'].split(" ")[1];
                const verifier = jwt.verify(token, process.env.SECRET_KEY);
                req['user']  = verifier; 
                next()
            } catch(err) {
                throw new UnauthorizedException()
            }
        } else {
            throw new UnauthorizedException()
        }
    }
}
