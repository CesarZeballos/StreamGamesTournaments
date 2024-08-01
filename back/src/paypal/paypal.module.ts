import { Module } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { PayPalController } from './paypal.controller';

@Module({
  providers: [PayPalService],
  controllers: [PayPalController],
})
export class PayPalModule {}
