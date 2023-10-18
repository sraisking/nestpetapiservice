import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './dto/pet.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}

//forfeature fpr submordules and forroot for root modukes
