import { Column } from 'typeorm';
import { Item, PetStatus } from '../pet.model';

export class UpdatePetItemsDto {
  @Column({ type: 'enum', enum: PetStatus })
  status: PetStatus;
  @Column({ type: 'json', nullable: true, array: false })
  items: Item[];
}
