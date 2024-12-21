import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { findAll, updateModel } from 'src/common/helperFunction';
import {
  PaginationParams,
  PaginationResponse,
} from 'src/common/model/pagination.model';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { CreateCollegeDto } from './dto/create-college.dto';

@Injectable()
export class CollegeService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCollegeDto: CreateCollegeDto,
  ): Promise<{ message: string; data: CreateCollegeDto }> {
    const existingCollege = await this.prisma.college.findFirst({
      where: {
        name: createCollegeDto.name,
        cityId: createCollegeDto.cityId,
        stateId: createCollegeDto.stateId,
      },
    });

    if (existingCollege) {
      throw new ConflictException(ErrorMessages.COLLEGE_ALREADY_EXISTS);
    }

    const college = await this.prisma.college.create({
      data: createCollegeDto,
    });

    return {
      message: SuccessMessages.COLLEGE_CREATE,
      data: college,
    };
  }

  async findAllColleges(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<CreateCollegeDto>> {
    const { cursor, page, limit } = paginationDto;
    const paginationParams: PaginationParams = { cursor, page, limit };

    const { data, meta } = await findAll<CreateCollegeDto>(
      this.prisma.college,
      paginationParams,
      { city: true, state: true },
    );

    return {
      data,
      meta,
    };
  }

  async updateCollege(id: number, data: UpdateCollegeDto) {
    // Check if the college exists
    const existingCollege = await this.prisma.college.findUnique({
      where: { id },
    });
    if (!existingCollege) {
      throw new NotFoundException(ErrorMessages.COLLEGE_NOT_FOUND);
    }

    // Check for name uniqueness within the same city and state
    const collegeExistsInCityState = await this.prisma.college.findFirst({
      where: {
        name: data.name,
        cityId: data.cityId,
        stateId: data.stateId,
        id: { not: id },
      },
    });

    if (collegeExistsInCityState) {
      throw new ConflictException(ErrorMessages.COLLEGE_ALREADY_EXISTS);
    }
    return await updateModel(this.prisma.college, { id }, data);
  }
}
