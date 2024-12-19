/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Habilitando CORS para utilizar via vue(5173 é a minha porta, se for usar em outro lugar, pode mudar)
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  const config = new DocumentBuilder()
  .setTitle("API")
  .setDescription("Gerando a documentação")
  .setVersion('1.0')
  .addTag('usuarios')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
