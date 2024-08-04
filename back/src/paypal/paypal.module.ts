/* import { Module } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { PayPalController } from './paypal.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeamsModule } from 'teams/teams.module';

@Module({
	imports: [PrismaModule, TeamsModule],
	providers: [PayPalService],
	controllers: [PayPalController],
	exports: [PayPalService],
})
export class PayPalModule {}
 */

import { Module, forwardRef } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { PayPalController } from './paypal.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeamsModule } from 'teams/teams.module';

@Module({
	imports: [
		PrismaModule,
		forwardRef(() => TeamsModule), // Usa forwardRef aquí
	],
	providers: [PayPalService],
	controllers: [PayPalController],
	exports: [PayPalService],
})
export class PayPalModule {}
