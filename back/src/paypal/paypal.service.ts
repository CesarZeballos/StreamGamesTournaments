import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PayPalService {
	private clientId =
		'AbZ9yYVHCp0Q_0CCONEnymyfhZ0w8ne5ww3GuzZSH_rJMmLYw6N9529rbyvPdlwZvK0xGe6oAxOmn-JP';
	private clientSecret =
		'EFCylinPgX6KSJKOtkO07RietlNFLLPYR5nduW8B5IKcOX60QanxFqBxcNLN2v7oh0rZaBgm2GEZ1l8Z';

	private environment = new paypal.core.SandboxEnvironment(
		this.clientId,
		this.clientSecret,
	);
	private client = new paypal.core.PayPalHttpClient(this.environment);

	async createOrder() {
		const request = new paypal.orders.OrdersCreateRequest();
		request.headers['Content-Type'] = 'application/json';
		request.requestBody({
			intent: 'CAPTURE',
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: '100.00',
					},
				},
			],
		});

		try {
			const response = await this.client.execute(request);
			return response.result;
		} catch (error) {
			console.error('PayPal create order error:', error);
			throw new Error('Failed to create PayPal order');
		}
	}

	async captureOrder(orderId: string) {
		const request = new paypal.orders.OrdersCaptureRequest(orderId);
		request.headers['Content-Type'] = 'application/json';

		try {
			const response = await this.client.execute(request);
			return response.result;
		} catch (error) {
			console.error('PayPal capture order error:', error);
			throw new Error('Failed to capture PayPal order');
		}
	}
}
