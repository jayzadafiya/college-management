import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStateDto {
  @ApiProperty({
    description: 'Name of the state',
    maxLength: 100,
    example: 'Gujarat',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}
