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
import { CollegePlacementService } from './college-placement.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCollegePlacementDto } from './dto/create-college-placement.dto';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { ApiCustomResponse } from 'src/common/decorator/api-response.decorator';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { PlacementMessages } from 'src/common/constants/module-constants/placement.constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationQuery } from 'src/common/decorator/pagination-query.decorator';
import { PaginationMessage } from 'src/common/constants/pagination.constants';
import { UpdateCollegePlacementDto } from './dto/update-college-placement.dto';

@ApiTags('College Placement')
@Controller('college-placement')
@UseInterceptors(TransformInterceptor)
export class CollegePlacementController {
  constructor(
    private readonly collegePlacementService: CollegePlacementService,
  ) {}

  @Post()
  @ApiOperation({
    summary: PlacementMessages.CREATE_SUMMARY,
    description: PlacementMessages.CREATE_DESCRIPTION,
  })
  @ApiCustomResponse(
    HttpStatus.CREATED,
    SuccessMessages.COLLEGE_PLACEMENT_CREATED,
    CreateCollegePlacementDto,
  )
  @ApiCustomResponse(
    HttpStatus.CONFLICT,
    ErrorMessages.COLLEGE_PLACEMENT_ALREADY_EXISTS_FOR_YEAR,
  )
  @ApiBody({
    type: CreateCollegePlacementDto,
    description: PlacementMessages.CREATE_BODY_DESCRIPTION,
  })
  async create(@Body() createCollegePlacementDto: CreateCollegePlacementDto) {
    return await this.collegePlacementService.createCollegePlacement(
      createCollegePlacementDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: PlacementMessages.GET_ALL_SUMMARY,
    description: PlacementMessages.GET_ALL_DESCRIPTION,
  })
  @ApiCustomResponse(
    HttpStatus.OK,
    SuccessMessages.COLLEGE_PLACEMENT_RETRIEVED,
    [CreateCollegePlacementDto],
  )
  @ApiCustomResponse(HttpStatus.BAD_REQUEST, PaginationMessage.INVALID_PAGE)
  @PaginationQuery()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.collegePlacementService.findAllCollegesPlacement(
      paginationDto,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: PlacementMessages.UPDATE_SUMMARY,
    description: PlacementMessages.UPDATE_DESCRIPTION,
  })
  @ApiCustomResponse(
    HttpStatus.OK,
    SuccessMessages.COLLEGE_PLACEMENT_UPDATED,
    UpdateCollegePlacementDto,
  )
  @ApiCustomResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessages.COLLEGE_PLACEMENT_NOT_FOUND,
  )
  @ApiCustomResponse(
    HttpStatus.CONFLICT,
    ErrorMessages.COLLEGE_PLACEMENT_ALREADY_EXISTS_FOR_YEAR,
  )
  @ApiParam({
    name: 'id',
    description: PlacementMessages.UPDATE_PARAM_DESCRIPTION,
    example: 1,
    required: true,
  })
  @ApiBody({
    type: UpdateCollegePlacementDto,
    description: PlacementMessages.UPDATE_BODY_DESCRIPTION,
  })
  async updatePlacement(
    @Param('id') id: number,
    @Body() updateCollegePlacementDto: UpdateCollegePlacementDto,
  ) {
    return await this.collegePlacementService.updatePlacement(
      id,
      updateCollegePlacementDto,
    );
  }
}
