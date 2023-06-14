import { Module } from "@nestjs/common";
import { TagTasksController } from "./tagTasks.controller";
import { TasksModule } from "src/tasks/tasks.module";
import { TagsModule } from "src/tags/tags.module";
import { TagTasksService } from "./tagTasks.service";

@Module({
    imports: [TasksModule, TagsModule],
    controllers: [TagTasksController],
    providers: [TagTasksService],
    exports: []
})

export class tagTasksModule {}
