import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Item, Pet } from './pet.model';
import { AddPetDto } from './dto/add-pet.dto';
import { GetPetsFilter } from './dto/get-pets-filter.dto';
import { UpdatePetStatusDto } from './dto/update-pet-status.dto';
import { PetEntity } from './dto/pet.entity';
import { UpdatePetItemsDto } from './dto/update-pet-items.dto';

@Controller('pets')
export class PetsController {
  //On using private we can access petsservicce with this inside this class in ts
  constructor(private petsService: PetsService) { }
  @Get()
  getPets(@Query() filterDto: GetPetsFilter): Promise<Pet[]> {
    return this.petsService.getAllPets(filterDto);
  }
  @Post()
  addPet(@Body() addPetDto: AddPetDto): Promise<PetEntity> {
    console.log(addPetDto);

    return this.petsService.addPet(addPetDto);
  }

  @Get('/:id')
  async getPetById(@Param('id') id: string): Promise<PetEntity> {
    return this.petsService.getPetById(id);
  }

  @Delete('/:id')
  deletePetDetails(@Param('id') id: string): Promise<void> {
    return this.petsService.deletePetDetails(id);
  }

  @Patch('/:id/status')
  updatePetDetails(
    @Param('id') id: string,
    @Body() details: UpdatePetItemsDto,
  ): Promise<Pet> {
    // const { details } = updateStatus;
    // console.log(details);
    return this.petsService.updatePetDetails(id, details);
  }
}
