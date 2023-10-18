import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PetStatus } from '../pet.model';

export class GetPetsFilter {
  @IsOptional()
  @IsEnum(PetStatus)
  status?: PetStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
