import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('payment')
export class PaymentController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async processPayment(@Body('cartServiceUrl') cartServiceUrl: string): Promise<any> {
    try {
      // Fetch total price from cart service
      const cartResponse = await lastValueFrom(
        this.httpService.get(`${cartServiceUrl}/total`)
      );

      const totalPrice = cartResponse.data.totalPrice;

      // Simulate payment process
      if (!totalPrice || totalPrice <= 0) {
        throw new HttpException('Invalid total price', HttpStatus.BAD_REQUEST);
      }

      const paymentId = Math.random().toString(36).substr(2, 9);
      console.log(`Processing payment for $${totalPrice}`);

      return {
        status: 'success',
        message: 'Payment processed successfully',
        paymentId: paymentId,
        amount: totalPrice,
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new HttpException('Payment failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
