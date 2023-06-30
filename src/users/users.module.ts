import { MiddlewareConsumer, Module, NestModule, forwardRef } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schemas/users.schema";
import { TasksModule } from "src/tasks/tasks.module";
import { TagsModule } from "src/tags/tags.module";
import { AuthMiddleware } from "src/middlewares/auth.middleware";

@Module({
    imports: [MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}])],
    controllers: [UserController],
    providers: [UsersService],
    exports: [MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]), UsersService]
})


export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
