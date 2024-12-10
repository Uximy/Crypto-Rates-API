import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";
import {HttpExceptionFilter} from "./filter/http-exception.filter";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Настройка Swagger
  const config = new DocumentBuilder()
      .setTitle('Сервис криптовалютных курсов')
      .setDescription('API для управления криптовалютными курсами')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();
