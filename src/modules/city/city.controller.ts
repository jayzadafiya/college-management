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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCityDto } from './dto/create-city.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { CityMessages } from 'src/common/constants/module-constants/city.constants';
import { ApiCustomResponse } from 'src/common/decorator/api-response.decorator';
import { PaginationQuery } from 'src/common/decorator/pagination-query.decorator';

@ApiTags('Cities')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiOperation({
    summary: CityMessages.CREATE_SUMMARY,
    description: CityMessages.CREATE_DESCRIPTION,
  })
  @ApiCustomResponse(
    HttpStatus.CREATED,
    SuccessMessages.CITY_CREATED,
    CreateCityDto,
  )
  @ApiCustomResponse(HttpStatus.CONFLICT, ErrorMessages.CITY_ALREADY_EXISTS)
  @ApiCustomResponse(HttpStatus.NOT_FOUND, ErrorMessages.STATE_NOT_FOUND)
  @ApiBody({
    type: CreateCityDto,
    description: CityMessages.CREATE_BODY_DESCRIPTION,
  })
  async create(@Body() createCityDto: CreateCityDto) {
    return await this.cityService.create(createCityDto);
  }

  @Get()
  @ApiOperation({
    summary: CityMessages.GET_ALL_SUMMARY,
    description: CityMessages.GET_ALL_DESCRIPTION,
  })
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.CITY_RETRIEVED, [
    CreateCityDto,
  ])
  @PaginationQuery()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.cityService.findAllCitiesWithPagination(paginationDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: CityMessages.UPDATE_SUMMARY,
    description: CityMessages.UPDATE_DESCRIPTION,
  })
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.CITY_UPDATED, CreateCityDto)
  @ApiCustomResponse(HttpStatus.NOT_FOUND, ErrorMessages.CITY_NOT_FOUND)
  @ApiCustomResponse(
    HttpStatus.CONFLICT,
    ErrorMessages.CITY_ALREADY_EXISTS_IN_STATE,
  )
  @ApiParam({
    name: 'id',
    description: CityMessages.UPDATE_PARAM_DESCRIPTION,
    example: 1,
    required: true,
  })
  @ApiBody({
    type: UpdateCityDto,
    description: CityMessages.UPDATE_BODY_DESCRIPTION,
  })
  async updateCity(
    @Param('id') id: number,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    return await this.cityService.updateCity(id, updateCityDto);
  }
}
