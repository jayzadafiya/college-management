import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { CollegeDtoMessages } from 'src/common/constants/module-constants/college.constants';

export class UpdateCollegeDto {
  @ApiProperty({
    description: CollegeDtoMessages.NAME_DESCRIPTION,
    example: 'Government Engineering College',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: CollegeDtoMessages.CITY_ID_DESCRIPTION,
    example: 1,
  })
  @IsInt()
  cityId: number;

  @ApiProperty({
    description: CollegeDtoMessages.STATE_ID_DESCRIPTION,
    example: 23,
  })
  @IsInt()
  stateId: number;

  @ApiProperty({
    description: CollegeDtoMessages.SCORE_DESCRIPTION,
    example: 850,
  })
  @IsInt()
  @IsOptional()
  score?: number;
}
