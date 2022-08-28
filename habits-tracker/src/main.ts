import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.API_PORT || 3000;  
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
      .setTitle('Лучшая версия себя')
      .setDescription('Трекер привычек')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);  

  await app.listen(PORT, () => console.log(`Habbits Tracker API started on port ${PORT}`));
}
start();
