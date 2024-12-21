import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { StateService } from './state.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStateDto } from './dto/create-state.dto';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';

@ApiTags('States')
@Controller('state')
@UseInterceptors(TransformInterceptor)
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new state' })
  @ApiOperation({
    summary: 'Create a new state',
    description: 'Creates a new state in the database.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: SuccessMessages.STATE_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ErrorMessages.STATE_ALREADY_EXISTS,
  })
  @ApiBody({
    type: CreateStateDto,
    description: 'The details of the state to be created.',
  })
  async create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all states',
    description:
      'Retrieves a list of all states along with their associated city and college counts.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SuccessMessages.STATE_RETRIEVED,
  })
  async findAll() {
    return await this.stateService.findAll();
  }
}
