import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Tags, TagsSchema } from "./schemas/tags.schema";
import { UsersModule } from "src/users/users.module";
import { TasksModule } from "src/tasks/tasks.module";

@Module({
    imports: [MongooseModule.forFeature([{name: Tags.name, schema: TagsSchema}]),  UsersModule],
    controllers: [TagsController],
    providers: [TagsService],
    exports:[MongooseModule.forFeature([{name: Tags.name, schema: TagsSchema}])]
})

export class TagsModule {};
