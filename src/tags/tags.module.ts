import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Tags, TagsSchema } from "./schemas/tags.schema";
import { UsersModule } from "src/users/users.module";
import { TasksModule } from "src/tasks/tasks.module";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { TagAccessMiddleware } from "src/middlewares/tagAccess.middleware";

@Module({
    imports: [MongooseModule.forFeature([{name: Tags.name, schema: TagsSchema}]),  UsersModule],
    controllers: [TagsController],
    providers: [TagsService],
    exports:[MongooseModule.forFeature([{name: Tags.name, schema: TagsSchema}])]
})

export class TagsModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware, TagAccessMiddleware).forRoutes(TagsController)
    }
}