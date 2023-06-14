import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from "@nestjs/common";
import { cascadeDeleteController } from "./cascadeDelete.controller";
import { cascadeDeleteService } from "./cascadeDelete.service";
import { TasksModule } from "src/tasks/tasks.module";
import { UsersModule } from "src/users/users.module";
import { TagsModule } from "src/tags/tags.module";
import { AuthMiddleware } from "src/middlewares/auth.middleware";

@Module({
    imports: [TasksModule, UsersModule, TagsModule],
    controllers: [cascadeDeleteController],
    providers: [cascadeDeleteService],
    exports: []
})

export class cascadeDeleteModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(cascadeDeleteController)
    }
}