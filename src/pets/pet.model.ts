export interface Pet {
  id: string;
  name: string;
  owner: string;
  medicalHistory: string;
  contact: string;
  status: PetStatus;
  dateOfAdmission: Date;
  dateOfDischarge?: Date;
  vaccination?: VaccinationStatus;
  lastVaccinationDate?: Date;
  deworming?: DewormingStatus;
  lastDewormingDate?: Date;
  lastSpotOnDate?: Date;
  items: Item[];
}
export enum PetStatus {
  DICHARGED = 'DISCHARGED',
  FOSTERING = 'FOSTERING',
}
export enum VaccinationStatus {
  DONE = 'DONE',
  NOT_DONE = 'NOT DONE',
}
export enum DewormingStatus {
  DONE = 'DONE',
  NOT_DONE = 'NOT DONE',
}
export enum SpotOnStatus {
  DONE = 'DONE',
  NOT_DONE = 'NOT DONE',
}
export interface Item {
  name: string;
  description: string;
  price: number;
}
