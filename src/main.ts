/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(reflector),
    new ClassSerializerInterceptor(reflector),
  );
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();
  logger.log(`Application is running on: ${url}`);
  console.log('env:', process.env.NODE_ENV);
}

bootstrap();
