import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schemas/users.schema";
import { TasksModule } from "src/tasks/tasks.module";
import { TagsModule } from "src/tags/tags.module";

@Module({
    imports: [MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]), forwardRef(()=> TasksModule)
, TagsModule],
    controllers: [UserController],
    providers: [UsersService],
    exports: [MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]), UsersService]
})

export class UsersModule {}