import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsDecimal } from 'class-validator';
import { PlacementDtoMessages } from 'src/common/constants/module-constants/placement.constants';

export class CreateCollegePlacementDto {
  @ApiProperty({
    description:PlacementDtoMessages.COLLEGE_ID_DESCRIPTION,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  collegeId: number;

  @ApiProperty({
    description:PlacementDtoMessages.YEAR_DESCRIPTION,
    example: 2023,
  })
  @IsInt()
  year: number;

  @ApiProperty({
    description:PlacementDtoMessages.HIGHEST_PLACEMENT_DESCRIPTION,
    example: 1200000,
  })
  @IsDecimal()
  @IsNotEmpty()
  highestPlacement: string;

  @ApiProperty({
    description:PlacementDtoMessages.AVERAGE_PLACEMENT_DESCRIPTION,
    example: 800000,
  })
  @IsDecimal()
  @IsNotEmpty()
  averagePlacement: string;

  @ApiProperty({
    description: PlacementDtoMessages.MEDIAN_PLACEMENT_DESCRIPTION,
    example: 750000,
  })
  @IsDecimal()
  @IsNotEmpty()
  medianPlacement: string;

  @ApiProperty({
    description: PlacementDtoMessages.PLACEMENT_RATE_DESCRIPTION,
    example: 85.5,
  })
  @IsDecimal()
  @IsNotEmpty()
  placementRate: string;
}
