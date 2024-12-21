import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CityService } from './city.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCityDto } from './dto/create-city.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ErrorMessages } from 'src/common/constants/error.constants';

@ApiTags('Cities')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: SuccessMessages.CITY_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ErrorMessages.CITY_ALREADY_EXISTS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.STATE_NOT_FOUND,
  })
  @ApiBody({
    type: CreateCityDto,
    description: 'The details of the city to be created.',
  })
  async create(@Body() createCityDto: CreateCityDto) {
    return await this.cityService.create(createCityDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all cities with pagination (cursor or page-based)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SuccessMessages.CITY_RETRIEVED,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: 'number',
    description:
      'The cursor (ID) to start the next page of results from. Use this for cursor-based pagination.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description:
      'The page number to retrieve. Use this for page-based pagination.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'The number of results per page or cursor range.',
    example: 10,
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.cityService.findAllCitiesWithPagination(paginationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a city' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SuccessMessages.CITY_UPDATE,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.CITY_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ErrorMessages.CITY_ALREADY_EXISTS_IN_STATE,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the city to update',
    example: 1,
    required: true,
  })
  @ApiBody({
    type: UpdateCityDto,
    description: 'The details of the city to be updated.',
  })
  async updateCity(
    @Param('id') id: number,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    return await this.cityService.updateCity(id, updateCityDto);
  }
}
