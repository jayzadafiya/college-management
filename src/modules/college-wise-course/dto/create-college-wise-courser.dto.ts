import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CollegeWiseCourseDtoMessages } from 'src/common/constants/module-constants/course.constants';

export class CreateCollegeWiseCourseDto {
  @ApiProperty({
    description: CollegeWiseCourseDtoMessages.COLLEGE_ID_DESCRIPTION,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  collegeId: number;

  @ApiProperty({
    description: CollegeWiseCourseDtoMessages.COURSE_NAME_DESCRIPTION,
    example: 'Computer Science and Engineering',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  courseName: string;

  @ApiProperty({
    description: CollegeWiseCourseDtoMessages.COURSE_DURATION_DESCRIPTION,
    example: 4,
  })
  @IsInt()
  @Min(1)
  courseDuration: number;

  @ApiProperty({
    description: CollegeWiseCourseDtoMessages.COURSE_FEE_DESCRIPTION,
    example: 150000.0,
  })
  @IsNotEmpty()
  courseFee: number;
}
