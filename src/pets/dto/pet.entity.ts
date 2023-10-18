import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Item, PetStatus } from '../pet.model';

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  owner: string;
  @Column()
  contact: string;
  @Column({ type: 'enum', enum: PetStatus })
  status: PetStatus;
  @Column('date')
  dateOfAdmission: Date;
  @Column({ type: 'date', nullable: true })
  dateOfDischarge?: Date;
  @Column({ type: 'jsonb', nullable: true, array: false })
  items: Item[];
}
// .entity.ts should be given to autoloadentities in tyoeorm root
