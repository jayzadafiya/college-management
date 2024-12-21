import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @ApiPropertyOptional({
    description: 'Name of the city (optional for partial update)',
    example: 'Mumbai',
  })
  name?: string;

  @ApiPropertyOptional({
    description:
      'ID of the state the city belongs to (optional for partial update)',
    example: 5,
  })
  stateId?: number;
}
