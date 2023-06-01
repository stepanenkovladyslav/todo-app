import { Injectable } from "@nestjs/common";
import { createAccountDTO } from "./dto/createAccountDTO.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

@Injectable()

export class UsersService {
    constructor(@InjectModel(User) private readonly userModel : typeof User) {}

    async createAccount(body: createAccountDTO) {
       const user = await this.userModel.create({...body})
        user.save()
        return user;
    }

    login() {

    }

    logout() {

    }
}