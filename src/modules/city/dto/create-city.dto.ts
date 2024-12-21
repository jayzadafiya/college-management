import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { CityDtoMessages } from 'src/common/constants/module-constants/city.constants';

export class CreateCityDto {
  @ApiProperty({
    description: CityDtoMessages.NAME_DESCRIPTION,
    maxLength: 100,
    example: 'Surat',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    description: CityDtoMessages.STATE_ID_DESCRIPTION,
    example: 39,
  })
  @IsNumber()
  @IsNotEmpty()
  stateId: number;
}
