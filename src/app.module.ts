import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { tagTasksModule } from './tagTasks/tagTasks.module';
import { cascadeDeleteModule } from './cascadeDelete/cascadeDelete.module';


@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRoot(process.env.DB_CONNECT) ,TagsModule, TasksModule, UsersModule, AuthModule, tagTasksModule, cascadeDeleteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
