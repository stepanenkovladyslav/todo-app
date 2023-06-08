import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/users/schemas/users.schema";
import { createAccountDTO } from "./dto/createAccountDTO.dto";
import { loginDTO } from "./dto/loginDTO";
import { authorizeDTO } from "./dto/authorizeDTO";

const generateJwt = (username:string, email:string) => {
    const token = jwt.sign({username: username, email: email}, process.env.SECRET_KEY, {expiresIn: "2h"})
    return token
}

@Injectable()

export class AuthService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

    async createAccount(body: createAccountDTO) {
        let {username, email, password} = body;
        password = await bcrypt.hash(password, 10); 
        const user = await this.usersModel.create({username, email, password})
         await user.save()
         const token = generateJwt(user.username, user.email)
         return token;
     }

    async login(body: loginDTO) {
        const {username, password} = body;
        const user = await this.usersModel.findOne({username: username})
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