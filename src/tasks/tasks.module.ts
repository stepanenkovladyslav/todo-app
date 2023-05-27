import { Module } from "@nestjs/common";
import { TasksController } from "./tasks-controller";
import { Tasks } from "./tasks.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports: [SequelizeModule.forFeature([Tasks])],
    controllers: [TasksController],
    providers: []
})

export class TasksModule {}