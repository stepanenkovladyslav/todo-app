import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TagTasksController } from "./tagTasks.controller";
import { TasksModule } from "src/tasks/tasks.module";
import { TagsModule } from "src/tags/tags.module";
import { TagTasksService } from "./tagTasks.service";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { TaskAccessMiddleware } from "src/middlewares/taskAccess.middleware";
import { UsersModule } from "src/users/users.module";
import { TagAccessMiddleware } from "src/middlewares/tagAccess.middleware";

@Module({
    imports: [TasksModule, TagsModule, UsersModule],
    controllers: [TagTasksController],
    providers: [TagTasksService],
    exports: []
})

export class tagTasksModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {       
        consumer.apply(AuthMiddleware).forRoutes(TagTasksController);
        consumer.apply(TaskAccessMiddleware).forRoutes(
            { path: 'tag-tasks/get-tags/:id', method: RequestMethod.GET },
            { path: 'tag-tasks/add-tag', method: RequestMethod.PUT }
        );
        consumer.apply(TagAccessMiddleware).forRoutes({path: "tag-tasks/get-tasks/:id", method: RequestMethod.GET})
    }
}
