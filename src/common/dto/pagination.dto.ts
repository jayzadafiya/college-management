import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsInt, Min } from 'class-validator';
import { PaginationDtoMessage } from '../constants/pagination.constants';

export class PaginationDto {
  @ApiProperty({
    description: PaginationDtoMessage.CURSOR_DESCRIPTION,
    required: false,
    example: 0,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @IsInt()
  cursor?: number;

  @ApiProperty({
    description: PaginationDtoMessage.PAGE_DESCRIPTION,
    required: false,
    example: 1,
  })
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({
    description: PaginationDtoMessage.LIMIT_DESCRIPTION,
    required: false,
    example: 10,
  })
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsOptional()
  @IsNumber()
  @IsInt()
  limit: number = 10;
}
