import { Controller, Post, Param, Body } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PayPal')
@Controller('paypal')
export class PayPalController {
	constructor(private readonly payPalService: PayPalService) {}
	@Post('create-order/:tourId')
	async createOrder(@Param("tourId") tourId: string) {
		return this.payPalService.createOrder(tourId);
	}

	@Post('capture-order/:orderId')
	async captureOrder(@Param("orderId") orderId: string) {
		return this.payPalService.captureOrder(orderId);
	}
}
