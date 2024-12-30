import { Module } from '@nestjs/common';
import { PaymentController } from './app.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PaymentController],
})
export class AppModule {}
