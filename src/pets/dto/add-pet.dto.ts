import { Item, PetStatus } from '../pet.model';
import { IsNotEmpty } from 'class-validator';
export class AddPetDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  owner: string;
  @IsNotEmpty()
  contact: string;
  @IsNotEmpty()
  status: PetStatus;
  @IsNotEmpty()
  dateOfAdmission: Date;
  dateOfDischarge?: Date;
  items: Item[];
}
