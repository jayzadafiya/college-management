import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCollegePlacementDto } from './create-college-placement.dto';
import { PlacementDtoMessages } from 'src/common/constants/module-constants/placement.constants';

export class UpdateCollegePlacementDto extends PartialType(
  CreateCollegePlacementDto,
) {
  @ApiProperty({
    description: PlacementDtoMessages.COLLEGE_ID_DESCRIPTION,
    example: 1,
  })
  collegeId: number;

  @ApiProperty({
    description: PlacementDtoMessages.YEAR_DESCRIPTION,
    example: 2023,
  })
  year: number;

  @ApiProperty({
    description: PlacementDtoMessages.HIGHEST_PLACEMENT_DESCRIPTION,
    example: 1200000,
  })
  highestPlacement: string;

  @ApiProperty({
    description: PlacementDtoMessages.AVERAGE_PLACEMENT_DESCRIPTION,
    example: 800000,
  })
  averagePlacement: string;

  @ApiProperty({
    description: PlacementDtoMessages.MEDIAN_PLACEMENT_DESCRIPTION,
    example: 750000,
  })
  medianPlacement: string;

  @ApiProperty({
    description: PlacementDtoMessages.PLACEMENT_RATE_DESCRIPTION,
    example: 85.5,
  })
  placementRate: string;
}
