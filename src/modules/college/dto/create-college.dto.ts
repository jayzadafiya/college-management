import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateCollegeDto {
  @ApiProperty({
    description: 'Name of the college',
    example: 'Government engineering college',
  })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The score of the college (between 1 and 1000)',
    example: 850,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    description: 'The ID of the city where the college is located',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  cityId: number;

  @ApiProperty({
    description: 'The ID of the state where the college is located',
    example: 23,
  })
  @IsInt()
  @IsNotEmpty()
  stateId: number;
}
