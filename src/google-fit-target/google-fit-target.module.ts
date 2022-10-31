import { Module } from '@nestjs/common';
import { GoogleFitTargetService } from './google-fit-target.service';
import { GoogleFitTargetController } from './google-fit-target.controller';

@Module({
  controllers: [GoogleFitTargetController],
  providers: [GoogleFitTargetService],
})
export class GoogleFitTargetModule {}
