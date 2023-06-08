import * as jwt from "jsonwebtoken"
import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { createAccountDTO } from "./dto/createAccountDTO.dto";
import { Users } from "./schemas/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundError, generate } from "rxjs";
import { loginDTO } from "./dto/loginDTO";
import { authorizeDTO } from "./dto/authorizeDTO";


const generateJwt = (username:string, email:string) => {
    const token = jwt.sign({username: username, email: email}, process.env.SECRET_KEY, {expiresIn: "2h"})
    return token
}

@Injectable()

export class UsersService {
    constructor(@InjectModel(Users.name) private readonly userModel : Model<Users>) {}

    async createAccount(body: createAccountDTO) {
       let {username, email, password} = body;
       password = await bcrypt.hash(password, 10); 
       const user = await this.userModel.create({username, email, password})
        await user.save()
        const token = generateJwt(user.username, user.email)
        return token;
    }

    async getInfo(id: number) {
       const user = await this.userModel.findOne({_id: id}); 
       if (user) {
        return user
       }
       throw new NotFoundException() 
    }

    async getTasksForUser(id: number) {
        const user = await this.userModel.findOne({_id: id});
        if(user) {
            return user.tasks
        }
        throw new NotFoundException()
    }

    async login(body: loginDTO) {
    const {username, password} = body;
    const user = await this.userModel.findOne({username: username})
    if (user) {
        const rightPassword = await bcrypt.compare(password, user.password)
        if (rightPassword) {
           const token = generateJwt(username, user.email)
            return token;
        }
    }
    }

    async authorize(headers: authorizeDTO) {
        try {
            const oldToken = headers.authorization.split(" ")[1];
            const user = jwt.verify(oldToken, process.env.SECRET_KEY);
            if (typeof user === "object") {
                const token = generateJwt(user.username, user.email)
                return token;
            }
        } catch(err) {
            console.log(err)
        }
    }
}