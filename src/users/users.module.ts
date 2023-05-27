import { Module } from "@nestjs/common";
import { UserController } from "./users-controller";
import { Sequelize } from "sequelize";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: []
})

export class UsersModule {}