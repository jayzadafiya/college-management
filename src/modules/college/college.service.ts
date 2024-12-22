import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { findAll } from 'src/common/helperFunction';
import {
  PaginationParams,
  PaginationResponse,
} from 'src/common/model/pagination.model';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { CreateCollegeDto } from './dto/create-college.dto';
import { AvgPlacementSection } from './dto/college-placement-response.dto';

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
      { score: 'desc' },
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

    const updatedCity = await this.prisma.college.update({
      where: { id },
      data,
    });

    return {
      data: updatedCity,
      message: SuccessMessages.COLLEGE_UPDATE,
    };
  }

  async getCollegePlacementData(
    collegeId: number,
  ): Promise<{ avgSection: AvgPlacementSection[]; placementSection: any }> {
    const [avgSection, placementData] = await Promise.all([
      // Get average section
      this.prisma.collegePlacement.groupBy({
        by: ['year'],
        where: {
          collegeId,
          highestPlacement: { gt: 0 },
          averagePlacement: { gt: 0 },
          medianPlacement: { gt: 0 },
          placementRate: { gt: 0 },
        },
        _avg: {
          highestPlacement: true,
          averagePlacement: true,
          medianPlacement: true,
          placementRate: true,
        },
        orderBy: {
          year: 'desc',
        },
      }),

      // Get placement data ordered by year descending
      this.prisma.collegePlacement.findMany({
        where: {
          collegeId,
          placementRate: { gt: 0 },
        },
        orderBy: {
          year: 'desc',
        },
        select: {
          id: true,
          year: true,
          highestPlacement: true,
          averagePlacement: true,
          medianPlacement: true,
          placementRate: true,
        },
      }),
    ]);

    // Get the last two years of data
    const lastTwoYears = placementData.slice(0, 2);

    // Calculate placement trend
    const placementSection = placementData.map((current) => {
      let placement_trend = null;

      // Only calculate trend for the latest year
      if (lastTwoYears.length === 2 && current.year === lastTwoYears[0].year) {
        const currentRate = Number(current.placementRate);
        const previousRate = Number(lastTwoYears[1].placementRate);

        placement_trend = currentRate > previousRate ? 'UP' : 'DOWN';
      }

      return {
        ...current,
        placement_trend,
      };
    });

    // Format average section
    const formattedAvgSection = avgSection.map((avg) => ({
      year: avg.year,
      avg_highest_placement: Number(avg._avg.highestPlacement).toFixed(2),
      avg_average_placement: Number(avg._avg.averagePlacement).toFixed(2),
      avg_median_placement: Number(avg._avg.medianPlacement).toFixed(2),
      avg_placement_rate: Number(avg._avg.placementRate).toFixed(2),
    }));

    if (!formattedAvgSection.length && !placementSection.length) {
      throw new NotFoundException(ErrorMessages.COLLEGE_PLACEMENT_NOT_FOUND);
    }

    return {
      avgSection: formattedAvgSection,
      placementSection,
    };
  }
}
