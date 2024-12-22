import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CollegeService } from './college.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationQuery } from 'src/common/decorator/pagination-query.decorator';
import { ApiCustomResponse } from 'src/common/decorator/api-response.decorator';
import { CollegeMessages } from 'src/common/constants/module-constants/college.constants';
import { PaginationMessage } from 'src/common/constants/pagination.constants';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { CollegePlacementDataResponse } from './dto/college-placement-response.dto';

@ApiTags('Colleges')
@Controller('college_data')
@UseInterceptors(TransformInterceptor)
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Post()
  @ApiOperation({
    summary: CollegeMessages.CREATE_SUMMARY,
    description: CollegeMessages.CREATE_DESCRIPTION,
  })
  @ApiCustomResponse(HttpStatus.CREATED, SuccessMessages.COLLEGE_CREATE)
  @ApiCustomResponse(HttpStatus.CONFLICT, ErrorMessages.COLLEGE_ALREADY_EXISTS)
  @ApiBody({
    type: CreateCollegeDto,
    description: CollegeMessages.CREATE_BODY_DESCRIPTION,
  })
  async create(@Body() createCollegeDto: CreateCollegeDto) {
    return await this.collegeService.create(createCollegeDto);
  }

  @Get('all')
  @ApiOperation({
    summary: CollegeMessages.GET_ALL_SUMMARY,
    description: CollegeMessages.GET_ALL_DESCRIPTION,
  })
  @PaginationQuery()
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.COLLEGE_RETRIEVED, [
    CreateCollegeDto,
  ])
  @ApiCustomResponse(HttpStatus.BAD_REQUEST, PaginationMessage.INVALID_PAGE)
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.collegeService.findAllColleges(paginationDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: CollegeMessages.UPDATE_SUMMARY,
    description: CollegeMessages.UPDATE_DESCRIPTION,
  })
  @ApiCustomResponse(
    HttpStatus.OK,
    SuccessMessages.COLLEGE_UPDATE,
    UpdateCollegeDto,
  )
  @ApiCustomResponse(HttpStatus.NOT_FOUND, ErrorMessages.COLLEGE_NOT_FOUND)
  @ApiCustomResponse(HttpStatus.CONFLICT, ErrorMessages.COLLEGE_ALREADY_EXISTS)
  @ApiParam({
    name: 'id',
    description: CollegeMessages.UPDATE_PARAM_DESCRIPTION,
    example: 1,
    required: true,
  })
  @ApiBody({
    type: UpdateCollegeDto,
    description: CollegeMessages.UPDATE_BODY_DESCRIPTION,
  })
  async updateCollege(
    @Param('id') id: number,
    @Body() updateCollegeDto: UpdateCollegeDto,
  ) {
    return await this.collegeService.updateCollege(id, updateCollegeDto);
  }

  @Get(':collegeId')
  @ApiOperation({
    summary: CollegeMessages.PLACEMENT_SUMMARY,
    description: CollegeMessages.PLACEMENT_DESCRIPTION,
  })
  @ApiParam({
    name: 'collegeId',
    description: CollegeMessages.PLACEMENT_PARAM_DESCRIPTION,
    type: Number,
    example: 1,
  })
  @ApiCustomResponse(
    HttpStatus.OK,
    SuccessMessages.COLLOEG_PLACEMENT_DETAILS,
    CollegePlacementDataResponse,
  )
  @ApiCustomResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessages.COLLEGE_PLACEMENT_NOT_FOUND,
  )
  async getCollegePlacementData(
    @Param('collegeId', ParseIntPipe) collegeId: number,
  ) {
    return this.collegeService.getCollegePlacementData(collegeId);
  }
}
