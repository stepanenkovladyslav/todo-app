import { Module } from "@nestjs/common";
import { cascadeDeleteController } from "./cascadeDelete.controller";
import { cascadeDeleteService } from "./cascadeDelete.service";
import { TasksModule } from "src/tasks/tasks.module";
import { UsersModule } from "src/users/users.module";
import { TagsModule } from "src/tags/tags.module";

@Module({
    imports: [TasksModule, UsersModule, TagsModule],
    controllers: [cascadeDeleteController],
    providers: [cascadeDeleteService],
    exports: []
})

export class cascadeDeleteModule {}