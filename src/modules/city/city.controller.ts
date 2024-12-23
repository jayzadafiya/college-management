import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CityService } from './city.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCityDto } from './dto/create-city.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { CityMessages } from 'src/common/constants/module-constants/city.constants';
import { ApiCustomResponse } from 'src/common/decorator/api-response.decorator';
import { PaginationQuery } from 'src/common/decorator/pagination-query.decorator';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { CreateCollegeDto } from '../college/dto/create-college.dto';

@ApiTags('Cities')
@Controller('city')
@UseInterceptors(TransformInterceptor)
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

  @Get('all')
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

  @Get('/colleges')
  @ApiOperation({
    summary: CityMessages.COLLEGE_GET_SUMMARY,
    description: CityMessages.COLLEGE_GET_DESCRIPTION,
  })
  @ApiQuery({
    name: 'city',
    required: false,
    type: String,
    description: CityMessages.COLLEGE_GET_CITY_DESCRIPTION,
    example: 'Surat',
  })
  @ApiQuery({
    name: 'state',
    required: false,
    type: String,
    description: CityMessages.COLLEGE_GET_STATE_DESCRIPTION,
    example: 'Gujarat',
  })
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.COLLEGE_MATCHING_CRITERIA, [
    CreateCollegeDto,
  ])
  @ApiCustomResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessages.CITY_NOT_FOUND_IN_STATE,
  )
  @PaginationQuery()
  @ApiCustomResponse(HttpStatus.BAD_REQUEST, ErrorMessages.INVALID_QUERY_PARAMS)
  async getColleges(
    @Query('city') city?: string,
    @Query('state') state?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('cursor') cursor: number = 1,
  ) {
    return this.cityService.getColleges(city, state, { page, limit, cursor });
  }
}
