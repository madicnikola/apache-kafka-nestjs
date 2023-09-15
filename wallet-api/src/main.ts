import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }),
  );
  const documentConfig = new DocumentBuilder().setTitle('Welcome').build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.PORT || 3001);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`API Swagger is running on: ${await app.getUrl()}/api`);
}
bootstrap();
