// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const port = process.env.PORT || 4000;

//   app.useGlobalPipes(new ValidationPipe());

//   const config = new DocumentBuilder()
//     .setTitle('Home Library Service')
//     .setDescription('Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!')
//     .setVersion('1.0.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);

//   SwaggerModule.setup('doc', app, document);

//   await app.listen(port);
//   console.log(`Server is running on http://localhost:${port}`);
//   console.log(`Swagger documentation is available at http://localhost:${port}/doc`);
// }

// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `Api documentation is available at http://localhost:${PORT}/doc`,
  );
}
bootstrap();