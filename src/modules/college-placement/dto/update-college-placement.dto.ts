import { PartialType } from '@nestjs/swagger';
import { CreateCollegePlacementDto } from './create-college-placement.dto';

export class UpdateCollegePlacementDto extends PartialType(
  CreateCollegePlacementDto,
) {}
