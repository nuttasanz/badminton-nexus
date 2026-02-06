/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();
  logger.log(`Application is running on: ${url}`);
  console.log('env:', process.env.NODE_ENV);
}

bootstrap();
