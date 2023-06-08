import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRoot(process.env.DB_CONNECT) ,TagsModule, TasksModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
