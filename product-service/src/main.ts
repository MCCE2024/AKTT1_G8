import { NestFactory } from '@nestjs/core';
import { ProductModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);

  // Enable CORS for all origins or specify specific ones
  app.enableCors({
    origin: ['http://localhost:8086'],  // Allow only the frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  });
  const prismaService = app.get(PrismaService);
  await app.listen(3000);
}
bootstrap();
