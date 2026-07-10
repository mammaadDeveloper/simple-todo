/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // body parser
  app.use(json());

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // cors
  app.enableCors();

  // helmet
  if (process.env.NODE_ENV == 'production')
    app.use(
      helmet({
        contentSecurityPolicy: false,

        crossOriginEmbedderPolicy: false,

        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },

        frameguard: {
          action: 'deny',
        },

        noSniff: true,

        referrerPolicy: {
          policy: 'no-referrer',
        },

        permittedCrossDomainPolicies: {
          permittedPolicies: 'none',
        },

        hidePoweredBy: true,
      }),
    );

  // compress
  app.use(compression);

  // swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Simple Todo API Documentation.')
    .setDescription('API documentation for the simple To-Do app project.')
    .setVersion('0.0.0')
    .addTag('Todo')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(config.get<number>('API_PORT', 3000));
}

bootstrap();
