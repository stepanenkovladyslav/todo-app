require("dotenv").config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SequelizeModule } from '@nestjs/sequelize';
const session = require('express-session');
const MySQLStoreFactory = require('express-mysql-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const MySQLStore = MySQLStoreFactory(session);
  const sessionStore = new MySQLStore({
   host: process.env.DB_HOST,
   port: +process.env.DB_PORT, 
   database: process.env.DB_NAME,
   user: process.env.USER_LOGIN,
   password: process.env.USER_PASSWORD
  })

  app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    store: sessionStore,
    saveUninitialized: false
  }))
  await app.listen(process.env.PORT);
}
bootstrap();
