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

    // If page is provided, use page-based pagination
    if (page) {
      return this.findCitiesWithPage(page, limit);
    }

    // Default behavior: use cursor pagination if neither cursor nor page is provided
    return this.findCitiesWithCursor(cursor, limit);
  }

  // Cursor-based pagination method
  private async findCitiesWithCursor(cursor: number, limit: number) {
    const cities = await this.prisma.city.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
      select: { id: true, name: true, stateId: true },
    });

    const nextCursor = cities.length ? cities[cities.length - 1].id : null;

    return {
      success: true,
      data: cities,
      meta: {
        nextCursor,
        limit,
      },
    };
  }

  // Page-based pagination method
  private async findCitiesWithPage(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const cities = await this.prisma.city.findMany({
      skip,
      take: limit,
      orderBy: { id: 'asc' },
      select: { id: true, name: true, stateId: true },
    });

    const totalCities = await this.prisma.city.count();

    return {
      success: true,
      data: cities,
      meta: {
        total: totalCities,
        page,
        limit,
        totalPages: Math.ceil(totalCities / limit),
      },
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
      message: 'City updated successfully',
    };
  }
}
