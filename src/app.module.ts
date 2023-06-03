import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}) , TagsModule, TasksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
