import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { StateService } from './state.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStateDto } from './dto/create-state.dto';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ApiCustomResponse } from 'src/common/decorator/api-response.decorator';
import { StateMessages } from 'src/common/constants/module-constants/state.constants';

@ApiTags('States')
@Controller('state')
@UseInterceptors(TransformInterceptor)
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @ApiOperation({
    summary: StateMessages.CREATE_SUMMARY,
    description: StateMessages.CREATE_DESCRIPTION,
  })
  @ApiCustomResponse(HttpStatus.CREATED, SuccessMessages.STATE_CREATED)
  @ApiCustomResponse(HttpStatus.CONFLICT, ErrorMessages.STATE_ALREADY_EXISTS)
  @ApiBody({
    type: CreateStateDto,
    description: StateMessages.CREATE_BODY_DESCRIPTION,
  })
  async create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get('all')
  @ApiOperation({
    summary: StateMessages.GET_ALL_SUMMARY,
    description: StateMessages.GET_ALL_DESCRIPTION,
  })
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.STATE_RETRIEVED)
  async findAll() {
    return await this.stateService.findAll();
  }

  @Post('seed')
  @ApiOperation({
    summary: StateMessages.SEED_SUMMARY,
    description: StateMessages.SEED_DESCRIPTION,
  })
  @ApiCustomResponse(HttpStatus.OK, SuccessMessages.STATE_SEEDED)
  @ApiCustomResponse(
    HttpStatus.INTERNAL_SERVER_ERROR,
    ErrorMessages.STATE_SEED_FAILED,
  )
  async seedStates() {
    await this.stateService.seedStates();
    return {
      success: true,
      message: SuccessMessages.STATE_SEEDED,
    };
  }
}
