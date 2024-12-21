import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, MaxLength } from 'class-validator';

export class UpdateCollegeDto {
  @ApiProperty({
    description: 'The name of the college.',
    example: 'Government Engineering College',
  })
  @IsString()
  @MaxLength(255, { message: 'College name should not exceed 255 characters.' })
  name: string;

  @ApiProperty({
    description: 'The ID of the city where the college is located.',
    example: 1,
  })
  @IsInt()
  cityId: number;

  @ApiProperty({
    description: 'The ID of the state where the college is located.',
    example: 23,
  })
  @IsInt()
  stateId: number;

  @ApiProperty({
    description: 'The score of the college.',
    example: 850,
  })
  @IsInt()
  @IsOptional()
  score?: number;
}
