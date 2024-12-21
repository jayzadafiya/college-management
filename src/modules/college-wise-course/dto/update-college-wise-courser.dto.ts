import { PartialType } from '@nestjs/swagger';
import { CreateCollegeWiseCourseDto } from './create-college-wise-courser.dto';

export class UpdateCollegeWiseCourseDto extends PartialType(
  CreateCollegeWiseCourseDto,
) {}
