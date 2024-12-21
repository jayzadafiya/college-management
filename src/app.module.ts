import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StateModule } from './modules/state/state.module';
import { CityModule } from './modules/city/city.module';
import { CollegeModule } from './modules/college/college.module';
import { CollegePlacementModule } from './modules/college-placement/college-placement.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    StateModule,
    CityModule,
    CollegeModule,
    CollegePlacementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
