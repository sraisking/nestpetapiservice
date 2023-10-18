export interface Pet {
  id: string;
  name: string;
  owner: string;
  contact: string;
  status: PetStatus;
  dateOfAdmission: Date;
  dateOfDischarge?: Date;
  items: Item[];
}
export enum PetStatus {
  DICHARGED = 'DISCHARGED',
  FOSTERING = 'FOSTERING',
}
export interface Item {
  name: string;
  description: string;
  price: number;
}
