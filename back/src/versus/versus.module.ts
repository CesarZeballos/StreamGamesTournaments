import { Module } from '@nestjs/common';
import { VersusController } from './versus.controller';
import { VersusService } from './versus.service';

@Module({
  controllers: [VersusController],
  providers: [VersusService]
})
export class VersusModule {}
