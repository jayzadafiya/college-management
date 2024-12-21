import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { StateDtoMessages } from 'src/common/constants/module-constants/state.constants';

export class CreateStateDto {
  @ApiProperty({
    description: StateDtoMessages.NAME_DESCRIPTION,
    maxLength: 100,
    example: 'Gujarat',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.toLowerCase())
  name: string;
}
