import { Module, forwardRef } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { PayPalController } from './paypal.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeamsModule } from 'teams/teams.module';

@Module({
	imports: [PrismaModule, forwardRef(() => TeamsModule)],
	providers: [PayPalService],
	controllers: [PayPalController],
	exports: [PayPalService],
})
export class PayPalModule {}
