import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schemas/users.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}])],
    controllers: [UserController],
    providers: [UsersService]
})

export class UsersModule {}