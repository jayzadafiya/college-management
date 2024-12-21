import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CollegeDtoMessages } from 'src/common/constants/module-constants/college.constants';
import { CreateCollegeDto } from './create-college.dto';

export class UpdateCollegeDto extends PartialType(CreateCollegeDto) {
  @ApiProperty({
    description: CollegeDtoMessages.NAME_DESCRIPTION,
    example: 'Government Engineering College',
  })
  name: string;

  @ApiProperty({
    description: CollegeDtoMessages.CITY_ID_DESCRIPTION,
    example: 1,
  })
  cityId: number;

  @ApiProperty({
    description: CollegeDtoMessages.STATE_ID_DESCRIPTION,
    example: 23,
  })
  stateId: number;

  @ApiProperty({
    description: CollegeDtoMessages.SCORE_DESCRIPTION,
    example: 850,
  })
  score?: number;
}
