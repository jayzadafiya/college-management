import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/**
 * A dynamic ApiResponse decorator that can be used to define any response status, description, and optional type.
 *
 * @param statusCode - The HTTP status code for the response (e.g., HttpStatus.OK).
 * @param description - A short description of the response.
 * @param type - The DTO type for the response body (optional).
 */
export function ApiCustomResponse(
  statusCode: number,
  description: string,
  type?: any,
) {
  return applyDecorators(
    ApiResponse({
      status: statusCode,
      description,
      type,
    }),
  );
}
