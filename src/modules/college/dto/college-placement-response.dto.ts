import { ApiProperty } from '@nestjs/swagger';
import { CollegePlacementResponseDtoMessages } from 'src/common/constants/module-constants/college.constants';

export class AvgPlacementSection {
  @ApiProperty({
    description: CollegePlacementResponseDtoMessages.YEAR_DESCRIPTION,
    example: 2023,
  })
  year: number;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.AVG_HIGHEST_PACKAGE_DESCRIPTION,
    example: '1200000.00',
  })
  avg_highest_placement: string;

  @ApiProperty({
    description: CollegePlacementResponseDtoMessages.AVG_PACKAGE_DESCRIPTION,
    example: '800000.00',
  })
  avg_average_placement: string;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.AVG_Median_PACKAGE_DESCRIPTION,
    example: '750000.00',
  })
  avg_median_placement: string;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.AVG_PERCENTAGE_PLACEMENT_DESCRIPTION,
    example: '85.50',
  })
  avg_placement_rate: string;
}

export class PlacementSection {
  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLACEMENT_SECTION_ID_DESCRIPTION,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLACEMENT_SECTION_YEAR_DESCRIPTION,
    example: 2023,
  })
  year: number;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLACEMENT_SECTION_HIGHEST_PLACEMENT_DESCRIPTION,
    example: '1200000',
  })
  highestPlacement: string;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLACEMENT_SECTION_AVERAGE_PLACEMENT_DESCRIPTION,
    example: '800000',
  })
  averagePlacement: string;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLACEMENT_SECTION_MEDIAN_PLACEMENT_DESCRIPTION,
    example: '750000',
  })
  medianPlacement: string;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLACEMENT_SECTION_PLACEMENT_RATE_DESCRIPTION,
    example: '85.5',
  })
  placementRate: string;

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLACEMENT_SECTION_TREND_DESCRIPTION,
    example: 'DOWN',
    nullable: true,
  })
  placement_trend: string | null;
}

export class CollegePlacementDataResponse {
  @ApiProperty({
    description: CollegePlacementResponseDtoMessages.AVG_SECTION_DESCRIPTION,
    type: [AvgPlacementSection],
  })
  avgSection: AvgPlacementSection[];

  @ApiProperty({
    description:
      CollegePlacementResponseDtoMessages.PLCAMENT_SECTION_DESCRIPTION,
    type: [PlacementSection],
  })
  placementSection: PlacementSection[];
}
