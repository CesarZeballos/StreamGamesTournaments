import { Controller, Post, Param, Body } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PayPal')
@Controller('paypal')
export class PayPalController {
	constructor(private readonly payPalService: PayPalService) {}
	@Post('create-order/:id')
	async createOrder(@Param('id') tournaments: string) {
		return this.payPalService.createOrder(tournaments);
	}

	@Post('capture-order/:orderId')
	async captureOrder(@Param('orderId') orderId: string) {
		return this.payPalService.captureOrder(orderId);
	}
}
