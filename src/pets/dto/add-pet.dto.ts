import { DewormingStatus, Item, PetStatus, SpotOnStatus, VaccinationStatus } from '../pet.model';
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
  lastVaccinationDate?: Date;
  lastDewormingDate?: Date;
  lastSpotOnDate?: Date;
  items: Item[];
  @IsNotEmpty()
  deworming: DewormingStatus;
  @IsNotEmpty()
  vaccination: VaccinationStatus;
  @IsNotEmpty()
  spotOnStatus: SpotOnStatus;
  medicalHistory: string;
}
