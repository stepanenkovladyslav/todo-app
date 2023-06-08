import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Tasks, TasksSchema } from "./schemas/tasks.schema";
import { TagsModule } from "src/tags/tags.module";
import { TagsService } from "src/tags/tags.service";
import { Tags } from "src/tags/schemas/tags.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Tasks.name, schema: TasksSchema}]), TagsModule],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [MongooseModule.forFeature([{name: Tasks.name, schema: TasksSchema}])]
})

export class TasksModule {}