import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { Sequelize } from "sequelize";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { UsersService } from "./users.service";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [UsersService]
})

export class UsersModule {}