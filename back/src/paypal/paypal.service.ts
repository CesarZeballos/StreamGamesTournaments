import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PayPalService {
	constructor(private readonly prisma: PrismaService) {}
	private clientId = process.env.PAYPAL_CLIENT_ID;
	private clientSecret = process.env.PAYPAL_CLIENT_SECRET;

	private environment = new paypal.core.SandboxEnvironment(
		this.clientId,
		this.clientSecret,
	);
	private client = new paypal.core.PayPalHttpClient(this.environment);

	async createOrder(tourId: string) {
		const tournament = await this.prisma.tournament.findUnique({
			where: { id: tourId },
			include: { teams: { include: { users: true } } },
		});

		const request = new paypal.orders.OrdersCreateRequest();
		request.headers['Content-Type'] = 'application/json';
		request.requestBody({
			intent: 'CAPTURE',
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: tournament.price.toString(),
					},
				},
			],
		});

		try {
			const response = await this.client.execute(request);
			console.log('createOrder', response.result);
			return response.result;
		} catch (error) {
			throw new Error('Failed to create PayPal order');
		}
	}

	async captureOrder(orderId: string) {
		const request = new paypal.orders.OrdersCaptureRequest(orderId);
		request.headers['Content-Type'] = 'application/json';

		const response = await this.client.execute(request);

		console.log('captureOrder', response.result);

		return response.result;
	}
}
