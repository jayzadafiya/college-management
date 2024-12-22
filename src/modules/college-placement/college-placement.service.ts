import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollegePlacementDto } from './dto/create-college-placement.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollegePlacement } from '@prisma/client';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  PaginationParams,
  PaginationResponse,
} from 'src/common/model/pagination.model';
import { findAll } from 'src/common/helperFunction';
import { UpdateCollegePlacementDto } from './dto/update-college-placement.dto';

@Injectable()
export class CollegePlacementService {
  constructor(private readonly prisma: PrismaService) {}

  async createCollegePlacement(
    createCollegePlacementDto: CreateCollegePlacementDto,
  ): Promise<{ message: string; data: CollegePlacement }> {
    const {
      collegeId,
      year,
      highestPlacement,
      averagePlacement,
      medianPlacement,
      placementRate,
    } = createCollegePlacementDto;

    // Check if a record for the given collegeId and year already exists
    const existingRecord = await this.prisma.collegePlacement.findFirst({
      where: { collegeId, year },
    });

    if (existingRecord) {
      const isSameRecord =
        existingRecord.highestPlacement.toNumber() ===
          parseFloat(highestPlacement) &&
        existingRecord.averagePlacement.toNumber() ===
          parseFloat(averagePlacement) &&
        existingRecord.medianPlacement.toNumber() ===
          parseFloat(medianPlacement) &&
        existingRecord.placementRate.toNumber() === parseFloat(placementRate);

      // If all the fields are the same, throw an error
      if (isSameRecord) {
        throw new ConflictException(
          ErrorMessages.COLLEGE_PLACEMENT_ALREADY_EXISTS_FOR_YEAR,
        );
      }
    }

    const placement = await this.prisma.collegePlacement.create({
      data: {
        collegeId,
        year,
        highestPlacement: parseFloat(highestPlacement) || 0,
        averagePlacement: parseFloat(averagePlacement) || 0,
        medianPlacement: parseFloat(medianPlacement) || 0,
        placementRate: parseFloat(placementRate) || 0,
      },
    });

    return {
      message: SuccessMessages.COLLEGE_PLACEMENT_CREATED,
      data: placement,
    };
  }

  async findAllCollegesPlacement(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<CreateCollegePlacementDto>> {
    const { cursor, page, limit } = paginationDto;
    const paginationParams: PaginationParams = { cursor, page, limit };

    const { data, meta } = await findAll<CreateCollegePlacementDto>(
      this.prisma.collegePlacement,
      paginationParams,
      { college: true },
    );

    return {
      data,
      meta,
    };
  }

  async updatePlacement(
    id: number,
    updateCollegePlacementDto: UpdateCollegePlacementDto,
  ) {
    const {
      collegeId,
      year,
      highestPlacement,
      averagePlacement,
      medianPlacement,
      placementRate,
    } = updateCollegePlacementDto;

    // Check if the placement record exists
    const placement = await this.prisma.collegePlacement.findUnique({
      where: { id },
    });

    if (!placement) {
      throw new NotFoundException(ErrorMessages.COLLEGE_PLACEMENT_NOT_FOUND);
    }

    // Check if a record for the given collegeId and year already exists
    const existingRecord = await this.prisma.collegePlacement.findFirst({
      where: { collegeId, year, NOT: { id } },
    });

    if (existingRecord) {
      const isSameRecord =
        existingRecord.highestPlacement.toNumber() ===
          parseFloat(highestPlacement) &&
        existingRecord.averagePlacement.toNumber() ===
          parseFloat(averagePlacement) &&
        existingRecord.medianPlacement.toNumber() ===
          parseFloat(medianPlacement) &&
        existingRecord.placementRate.toNumber() === parseFloat(placementRate);

      // If all the fields are the same, throw an error
      if (isSameRecord) {
        throw new ConflictException(
          ErrorMessages.COLLEGE_PLACEMENT_ALREADY_EXISTS_FOR_YEAR,
        );
      }
    }

    const updateCollegePlacement = await this.prisma.collegePlacement.update({
      where: { id },
      data: updateCollegePlacementDto,
    });

    return {
      data: updateCollegePlacement,
      message: SuccessMessages.COLLEGE_PLACEMENT_UPDATED,
    };
  }
}
