import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TagTasks, Tasks } from "./tasks.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { TasksService } from "./tasks.service";

@Module({
    imports: [SequelizeModule.forFeature([Tasks]), SequelizeModule.forFeature([TagTasks])],
    controllers: [TasksController],
    providers: [TasksService]
})

export class TasksModule {}