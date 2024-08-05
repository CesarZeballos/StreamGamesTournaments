import { Controller, Post, Param, Body } from '@nestjs/common';
import { PayPalService } from './paypal.service';

@Controller('paypal')
export class PayPalController {
	constructor(private readonly payPalService: PayPalService) {}

	@Post('create-order')
	async createOrder(@Body() paypal: any) {
		return this.payPalService.createOrder(paypal);
	}

	@Post('capture-order/:orderId')
	async captureOrder(@Param('orderId') orderId: string) {
		return this.payPalService.captureOrder(orderId);
	}
}
