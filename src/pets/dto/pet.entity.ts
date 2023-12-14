import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  DewormingStatus,
  Item,
  PetStatus,
  SpotOnStatus,
  VaccinationStatus,
} from '../pet.model';

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
  @Column({ nullable: true })
  medicalHistory: string;
  @Column({ type: 'enum', enum: PetStatus })
  status: PetStatus;
  @Column('date')
  dateOfAdmission: Date;
  @Column({ type: 'date', nullable: true })
  dateOfDischarge?: Date;
  @Column({
    type: 'enum',
    enum: DewormingStatus,
    default: DewormingStatus.NOT_DONE,
    nullable: true
  })
  deworming: DewormingStatus;
  @Column({
    type: 'enum',
    enum: VaccinationStatus,
    default: VaccinationStatus.NOT_DONE,
    nullable: true
  })
  vaccination: VaccinationStatus;
  @Column({
    type: 'enum',
    enum: SpotOnStatus,
    default: VaccinationStatus.NOT_DONE,
    nullable: true
  })
  spotOnStatus: SpotOnStatus;
  @Column({ type: 'date', nullable: true })
  lastVaccinationDate?: Date;
  @Column({ type: 'date', nullable: true })
  lastDewormingDate?: Date;
  @Column({ type: 'date', nullable: true })
  lastSpotOnDate?: Date;
  @Column({ type: 'jsonb', nullable: true, array: false })
  items: Item[];
}
// .entity.ts should be given to autoloadentities in tyoeorm root
