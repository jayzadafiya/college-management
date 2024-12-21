import { Module } from '@nestjs/common';
import { CollegePlacementService } from './college-placement.service';
import { CollegePlacementController } from './college-placement.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CollegePlacementController],
  providers: [CollegePlacementService],
})
export class CollegePlacementModule {}
