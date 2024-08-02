import { Controller, Post, Param } from '@nestjs/common';
import { PayPalService } from './paypal.service';

@Controller('paypal')
export class PayPalController {
	constructor(private readonly payPalService: PayPalService) {}

	@Post('create-order')
	async createOrder() {
		return this.payPalService.createOrder();
	}

	@Post('capture-order/:orderId')
	async captureOrder(@Param('orderId') orderId: string) {
		return this.payPalService.captureOrder(orderId);
	}
}
