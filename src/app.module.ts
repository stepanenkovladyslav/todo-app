import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRoot(process.env.DB_CONNECT) ,TagsModule, TasksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
