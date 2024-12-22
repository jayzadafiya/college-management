import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PaginationParams } from 'src/common/model/pagination.model';
import { findAll } from 'src/common/helperFunction';
import { Prisma } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto) {
    const existingCity = await this.prisma.city.findFirst({
      where: {
        name: createCityDto.name,
        stateId: createCityDto.stateId,
      },
    });

    if (existingCity) {
      throw new ConflictException(ErrorMessages.CITY_ALREADY_EXISTS_IN_STATE);
    }

    const state = await this.prisma.state.findUnique({
      where: { id: createCityDto.stateId },
    });

    if (!state) {
      throw new NotFoundException(ErrorMessages.STATE_NOT_FOUND);
    }

    const city = await this.prisma.city.create({
      data: createCityDto,
    });

    return {
      data: city,
      message: SuccessMessages.CITY_CREATED,
    };
  }

  async findAllCitiesWithPagination(paginationDto: PaginationDto) {
    const { cursor, page, limit } = paginationDto;

    const paginationParams: PaginationParams = { cursor, page, limit };

    const { data, meta } = await findAll<CreateCityDto>(
      this.prisma.city,
      paginationParams,
      { state: true },
    );

    return {
      data,
      meta,
    };
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto) {
    const existingCity = await this.prisma.city.findUnique({ where: { id } });
    if (!existingCity) {
      throw new NotFoundException(ErrorMessages.CITY_NOT_FOUND);
    }

    // Check for name uniqueness within the same state
    const cityExistsInState = await this.prisma.city.findFirst({
      where: {
        name: updateCityDto.name,
        stateId: updateCityDto.stateId,
        id: { not: id },
      },
    });

    if (cityExistsInState) {
      throw new ConflictException(ErrorMessages.CITY_ALREADY_EXISTS);
    }

    const updatedCity = await this.prisma.city.update({
      where: { id },
      data: updateCityDto,
    });

    return {
      success: true,
      data: updatedCity,
      message: SuccessMessages.CITY_UPDATED,
    };
  }

  async getColleges(
    cityName?: string,
    stateName?: string,
    paginationDto?: PaginationDto,
  ) {
    const { cursor, page, limit } = paginationDto;

    // If both city and state are provided, validate that the city exists in the given state
    if (cityName && stateName) {
      const cityExistsInState = await this.prisma.city.findFirst({
        where: {
          name: {
            equals: cityName,
            mode: 'insensitive',
          },
          state: {
            name: {
              equals: stateName,
              mode: 'insensitive',
            },
          },
        },
      });

      if (!cityExistsInState) {
        throw new NotFoundException(ErrorMessages.CITY_NOT_FOUND_IN_STATE);
      }
    }

    const where: Prisma.CollegeWhereInput = {
      ...(cityName && {
        city: {
          name: {
            equals: cityName,
            mode: 'insensitive',
          },
        },
      }),
      ...(stateName && {
        state: {
          name: {
            equals: stateName,
            mode: 'insensitive',
          },
        },
      }),
    };

    let skip = 0;

    if (page) {
      skip = (page - 1) * limit;
    } else {
      skip = cursor ? 1 : 0;
    }

    const colleges = await this.prisma.college.findMany({
      where,
      orderBy: {
        score: 'desc',
      },
      select: {
        id: true,
        name: true,
        score: true,
        city: {
          select: {
            name: true,
          },
        },
        state: {
          select: {
            name: true,
          },
        },
      },
      take: limit,
      skip,
    });

    let nextCursor: string | null = null;
    if (!page && colleges.length > 0) {
      nextCursor = colleges[colleges.length - 1].id.toString();
    }

    return {
      data: colleges,
      meta: {
        page: page || 1,
        limit: limit || 20,
        nextCursor,
        total: !Number.isNaN(cursor)
          ? null
          : await this.prisma.college.count({ where }),
      },
    };
  }
}
