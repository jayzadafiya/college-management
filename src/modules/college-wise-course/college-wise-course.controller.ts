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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { CollegeWiseCourseService } from './college-wise-course.service';
import { CreateCollegeWiseCourseDto } from './dto/create-college-wise-courser.dto';
import { ApiCustomResponse } from 'src/common/decorator/api-response.decorator';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { CollegeWiseCourseMessages } from 'src/common/constants/module-constants/course.constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationMessage } from 'src/common/constants/pagination.constants';
import { PaginationQuery } from 'src/common/decorator/pagination-query.decorator';
import { UpdateCollegeWiseCourseDto } from './dto/update-college-wise-courser.dto';

@ApiTags('College Course')
@Controller('college_course')
@UseInterceptors(TransformInterceptor)
export class CollegeWiseCourseController {
  constructor(private readonly courseService: CollegeWiseCourseService) {}

  @Post()
  @ApiOperation({
    summary: CollegeWiseCourseMessages.CREATE_SUMMARY,
    description: CollegeWiseCourseMessages.CREATE_DESCRIPTION,
  })
  @ApiCustomResponse(
    HttpStatus.CREATED,
    SuccessMessages.COLLEGE_COURSE_CREATED,
    CreateCollegeWiseCourseDto,
  )
  @ApiCustomResponse(HttpStatus.CONFLICT, ErrorMessages.COLLEGE_COURSE_EXISTS)
  @ApiBody({
    type: CreateCollegeWiseCourseDto,
    description: CollegeWiseCourseMessages.CREATE_BODY_DESCRIPTION,
  })
  async createCourse(@Body() createDto: CreateCollegeWiseCourseDto) {
    return this.courseService.createCourse(createDto);
  }

  @Get('all')
  @ApiOperation({
    summary: CollegeWiseCourseMessages.GET_ALL_SUMMARY,
    description: CollegeWiseCourseMessages.GET_ALL_DESCRIPTION,
  })
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.COLLEGE_COURSE_RETRIEVED, [
    CreateCollegeWiseCourseDto,
  ])
  @ApiCustomResponse(HttpStatus.BAD_REQUEST, PaginationMessage.INVALID_PAGE)
  @PaginationQuery()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.courseService.findAllCollegesCourses(paginationDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: CollegeWiseCourseMessages.UPDATE_SUMMARY,
    description: CollegeWiseCourseMessages.UPDATE_DESCRIPTION,
  })
  @ApiParam({
    name: 'id',
    description: CollegeWiseCourseMessages.UPDATE_PARAM_DESCRIPTION,
    required: true,
    example: 1,
  })
  @ApiBody({
    type: UpdateCollegeWiseCourseDto,
    description: CollegeWiseCourseMessages.UPDATE_BODY_DESCRIPTION,
  })
  @ApiCustomResponse(
    HttpStatus.OK,
    SuccessMessages.COLLEGE_COURSE_UPDATED,
    UpdateCollegeWiseCourseDto,
  )
  @ApiCustomResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessages.COLLEGE_COURSE_NOT_FOUND,
  )
  @ApiCustomResponse(HttpStatus.NOT_FOUND, ErrorMessages.COURSE_NAME_CONFLICT)
  async updateCourse(
    @Param('id') id: number,
    @Body() updateDto: UpdateCollegeWiseCourseDto,
  ) {
    return await this.courseService.updateCourse(id, updateDto);
  }

  @Get(':collegeId')
  @PaginationQuery()
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.COLLEGE_COURSE_RETRIEVED, [
    [CreateCollegeWiseCourseDto],
  ])
  @ApiParam({
    name: 'collegeId',
    description: CollegeWiseCourseMessages.UPDATE_PARAM_DESCRIPTION,
    required: true,
    example: 1,
  })
  @ApiCustomResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessages.COLLEGE_COURSE_NOT_FOUND,
  )
  @ApiCustomResponse(HttpStatus.BAD_REQUEST, PaginationMessage.INVALID_PAGE)
  async getCollegeCourses(
    @Param('collegeId', ParseIntPipe) collegeId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.courseService.getCollegeCourses(collegeId, paginationDto);
  }
}
