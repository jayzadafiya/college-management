import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CityDtoMessages } from 'src/common/constants/module-constants/city.constants';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @ApiPropertyOptional({
    description: CityDtoMessages.NAME_DESCRIPTION,
    example: 'Mumbai',
  })
  name?: string;

  @ApiPropertyOptional({
    description: CityDtoMessages.STATE_ID_DESCRIPTION,
    example: 5,
  })
  stateId?: number;
}
