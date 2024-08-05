import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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

	async createOrder(createTeamDto: any) {
		const tournament = await this.prisma.tournament.findUnique({
			where: { id: createTeamDto.tournamentId },
			include: { teams: { include: { users: true } } },
		});

		if (!tournament)
			throw new NotFoundException(
				`Tournament with id: ${createTeamDto.tournamentId} does not exists,
            `,
			);

		for (const team of tournament.teams) {
			for (const userExistsInTournament of team.users) {
				if (createTeamDto.users.includes(userExistsInTournament.id))
					throw new ConflictException(
						` User with id: ${userExistsInTournament.id} already exists in tournament,
                    `,
					);
			}
		}
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
