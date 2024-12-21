import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStateDto } from './dto/create-state.dto';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async create(createStateDto: CreateStateDto) {
    const existingState = await this.prisma.state.findFirst({
      where: { name: createStateDto.name },
    });

    if (existingState) {
      throw new ConflictException(ErrorMessages.STATE_ALREADY_EXISTS);
    }

    const state = await this.prisma.state.create({ data: createStateDto });

    return {
      success: true,
      data: state,
      message: SuccessMessages.STATE_CREATED,
    };
  }

  async findAll() {
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
}
