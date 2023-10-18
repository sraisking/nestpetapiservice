import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //saves a lot of code , whenever validation decorator is seen it handles .
  console.log(process.env)
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
