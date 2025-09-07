import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自動移除 DTO 以外的屬性
      forbidNonWhitelisted: true, // 如果有不在 DTO 的屬性會報錯
      transform: true, // 自動型別轉換
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
