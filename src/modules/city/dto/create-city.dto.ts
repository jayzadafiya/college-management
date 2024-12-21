import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    description: 'Name of the city',
    maxLength: 100,
    example: 'Surat',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Id of the state',
    example: 39,
  })
  @IsNumber()
  @IsNotEmpty()
  stateId: number;
}
