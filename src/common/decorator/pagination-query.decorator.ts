import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationMessage } from '../constants/pagination.constants';

export function PaginationQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'cursor',
      description: PaginationMessage.CURSOR,
      required: false,
      type: Number,
      example: 0,
    }),
    ApiQuery({
      name: 'page',
      description: PaginationMessage.PAGE,
      required: false,
      type: Number,
    }),
    ApiQuery({
      name: 'limit',
      description: PaginationMessage.LIMIT,
      required: false,
      type: Number,
      example: 10,
    }),
  );
}
