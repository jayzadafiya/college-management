import { Module } from '@nestjs/common';
import { CollegeWiseCourseController } from './college-wise-course.controller';
import { CollegeWiseCourseService } from './college-wise-course.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CollegeWiseCourseController],
  providers: [CollegeWiseCourseService],
})
export class CollegeWiseCourseModule {}
