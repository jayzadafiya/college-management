import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollegeWiseCourseDto } from './dto/create-college-wise-courser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorMessages } from 'src/common/constants/error.constants';
import { SuccessMessages } from 'src/common/constants/success.constants';
import { CollegeWiseCourse } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  PaginationParams,
  PaginationResponse,
} from 'src/common/model/pagination.model';
import { findAll } from 'src/common/helperFunction';
import { UpdateCollegeWiseCourseDto } from './dto/update-college-wise-courser.dto';

@Injectable()
export class CollegeWiseCourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(
    createDto: CreateCollegeWiseCourseDto,
  ): Promise<{ message: string; data: CollegeWiseCourse }> {
    // Check if a similar course exists for the same college
    const existingCourse = await this.prisma.collegeWiseCourse.findFirst({
      where: {
        collegeId: createDto.collegeId,
        courseName: createDto.courseName,
      },
    });

    if (existingCourse) {
      throw new ConflictException(ErrorMessages.COLLEGE_COURSE_EXISTS);
    }

    const course = await this.prisma.collegeWiseCourse.create({
      data: createDto,
    });
    return {
      message: SuccessMessages.COLLEGE_COURSE_CREATED,
      data: course,
    };
  }

  async findAllCollegesCourses(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<CreateCollegeWiseCourseDto>> {
    const { cursor, page, limit } = paginationDto;
    const paginationParams: PaginationParams = { cursor, page, limit };

    const { data, meta } = await findAll<CreateCollegeWiseCourseDto>(
      this.prisma.collegeWiseCourse,
      paginationParams,
      { college: true },
    );

    return {
      data,
      meta,
    };
  }

  async updateCourse(
    id: number,
    updateDto: UpdateCollegeWiseCourseDto,
  ): Promise<{ message: string; data: CollegeWiseCourse }> {
    // Check if the course exists
    const existingCourse = await this.prisma.collegeWiseCourse.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundException(ErrorMessages.COLLEGE_COURSE_NOT_FOUND);
    }

    // Check if updating course name would cause a conflict
    if (updateDto.courseName && updateDto.collegeId) {
      const conflictingCourse = await this.prisma.collegeWiseCourse.findFirst({
        where: {
          collegeId: updateDto.collegeId,
          courseName: updateDto.courseName,
          id: { not: id },
        },
      });

      if (conflictingCourse) {
        throw new ConflictException(ErrorMessages.COURSE_NAME_CONFLICT);
      }
    }

    // Perform the update
    const updatedCourse = await this.prisma.collegeWiseCourse.update({
      where: { id },
      data: updateDto,
    });

    return {
      message: SuccessMessages.COLLEGE_COURSE_UPDATED,
      data: updatedCourse,
    };
  }

  async getCollegeCourses(
    collegeId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<CreateCollegeWiseCourseDto>> {
    const { cursor, page, limit } = paginationDto;

    let courses;

    if (page) {
      const skip = (page - 1) * limit;

      courses = await this.prisma.collegeWiseCourse.findMany({
        where: {
          collegeId,
        },
        orderBy: {
          courseFee: 'desc',
        },
        select: {
          id: true,
          courseName: true,
          courseDuration: true,
          courseFee: true,
        },
        skip,
        take: limit,
      });
    } else {
      courses = await this.prisma.collegeWiseCourse.findMany({
        where: {
          collegeId,
        },
        orderBy: {
          courseFee: 'desc',
        },
        select: {
          id: true,
          courseName: true,
          courseDuration: true,
          courseFee: true,
        },
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        take: limit,
      });
    }

    if ((!courses || courses.length === 0) && (page >= 1 || cursor === 0)) {
      throw new NotFoundException(ErrorMessages.COLLEGE_COURSE_NOT_FOUND);
    }

    return {
      data: courses,
      meta: {
        page: page || 1,
        limit: limit || 20,
        nextCursor:
          cursor !== undefined
            ? courses.length
              ? courses[courses.length - 1].id
              : null
            : null,
        total:
          cursor !== undefined
            ? null
            : await this.prisma.collegeWiseCourse.count({
                where: {
                  collegeId,
                },
              }),
      },
    };
  }
}
