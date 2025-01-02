import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins or specify specific ones
  app.enableCors({
    origin: ['http://localhost:8086'],  // Allow only the frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
