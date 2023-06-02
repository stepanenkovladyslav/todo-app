import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { TagTasks, Tasks } from './tasks/tasks.model';
import { Tags } from './tags/tags.model';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}) , SequelizeModule.forRoot({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.USER_LOGIN, 
    password: process.env.USER_PASSWORD,
    database: process.env.DB_NAME,
    models: [User, Tags, Tasks, TagTasks],
    autoLoadModels: true,
    synchronize: true
  }) ,TagsModule, TasksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
