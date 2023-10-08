import { MiddlewareConsumer, Module, NestModule, forwardRef } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Tasks, TasksSchema } from "./schemas/tasks.schema";
import { TagsModule } from "src/tags/tags.module";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { TaskAccessMiddleware } from "src/middlewares/taskAccess.middleware";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }]), TagsModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }])]
})

export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, TaskAccessMiddleware).forRoutes(TasksController)
  }
}
