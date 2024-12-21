import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { CollegeDtoMessages } from 'src/common/constants/module-constants/college.constants';

export class CreateCollegeDto {
  @ApiProperty({
    description: CollegeDtoMessages.NAME_DESCRIPTION,
    example: 'Government engineering college',
  })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: CollegeDtoMessages.SCORE_DESCRIPTION,
    example: 850,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    description: CollegeDtoMessages.CITY_ID_DESCRIPTION,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  cityId: number;

  @ApiProperty({
    description: CollegeDtoMessages.STATE_ID_DESCRIPTION,
    example: 23,
  })
  @IsInt()
  @IsNotEmpty()
  stateId: number;
}
