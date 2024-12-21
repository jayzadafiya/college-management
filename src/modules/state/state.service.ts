import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStateDto } from './dto/create-state.dto';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async create(
    createStateDto: CreateStateDto,
  ): Promise<{ data: CreateStateDto; message: string }> {
    const existingState = await this.prisma.state.findFirst({
      where: { name: createStateDto.name },
    });

    if (existingState) {
      throw new ConflictException(ErrorMessages.STATE_ALREADY_EXISTS);
    }

    const state = await this.prisma.state.create({ data: createStateDto });

    return {
      data: state,
      message: SuccessMessages.STATE_CREATED,
    };
  }

  async findAll(): Promise<CreateStateDto[]> {
    return this.prisma.state.findMany({
      include: {
        _count: {
          select: {
            cities: true,
            colleges: true,
          },
        },
      },
    });
  }

  async seedStates() {
    const filePath = path.resolve(__dirname, '../config/state.json');
    const stateData: string[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const stateName of stateData) {
      this.create({ name: stateName });
    }
  }
}
