import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Tasks } from './tasks/tasks.model';
import { Tags } from './tags/tags.model';

@Module({
  imports: [ SequelizeModule.forRoot({
    dialect: "mysql",
    host: 'locahost',
    port: 3306,
    username: "root", 
    password: "12345",
    database: "taskManagement",
    models: [User, Tags, Tasks]
  }) ,TagsModule, TasksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
