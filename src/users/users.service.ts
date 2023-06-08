import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { createAccountDTO } from "./dto/createAccountDTO.dto";

@Injectable()

export class UsersService {
    // constructor(@InjectModel(User) private readonly userModel : typeof User) {}

    async createAccount(body: createAccountDTO) {
    //    let {username, email, password} = body;
    //     password = await bcrypt.hash(password, 10); //sequelize takes object with password field
    //    const user = await this.userModel.create({username, email, password})
      
    //     user.save()
    //     return user;
    }

    async getInfo(id: number) {
    //    const user = await this.userModel.findOne({where : {id}}); 
    //    if (user) {
    //     return user
    //    }
    //    return {message: "There is no such user"} 
    }

    login() {

    }

    logout() {

    }
}