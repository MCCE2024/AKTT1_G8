import { Module } from '@nestjs/common';
import { PaymentController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule, 
    ConfigModule.forRoot({ // Configure ConfigModule
      isGlobal: true, // Makes the ConfigService available globally
    })
  ],
  controllers: [PaymentController],
})
export class AppModule {}
