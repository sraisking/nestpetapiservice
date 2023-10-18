import { IsEnum } from 'class-validator';
import { PetStatus } from '../pet.model';

export class UpdatePetStatusDto {
  @IsEnum(PetStatus)
  status: PetStatus;
}
