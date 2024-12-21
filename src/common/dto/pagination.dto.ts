import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsInt } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description:
      'The cursor for pagination (id of the last item from the previous page)',
    required: false,
    example: 0,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @IsInt()
  cursor?: number;

  @ApiProperty({
    description:
      'The page number for pagination (used for page-based pagination)',
    required: false,
    example: 1,
  })
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsOptional()
  @IsNumber()
  @IsInt()
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    example: 10,
  })
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsOptional()
  @IsNumber()
  @IsInt()
  limit: number = 10;
}
