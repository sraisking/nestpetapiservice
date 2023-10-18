import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, PetStatus } from './pet.model';
import { AddPetDto } from './dto/add-pet.dto';
import { GetPetsFilter } from './dto/get-pets-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './dto/pet.entity';
import { Repository } from 'typeorm';
import { UpdatePetItemsDto } from './dto/update-pet-items.dto';
@Injectable()
export class PetsService {
  // private pets: Pet[] = [];
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
  ) { }

  async getAllPets(filterDto: GetPetsFilter): Promise<PetEntity[]> {
    const { status, search } = filterDto;
    const query = this.petRepository.createQueryBuilder('pets');

    if (status) {
      query.andWhere('pets.status=:status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(pets.owner) LIKE LOWER(:search) OR LOWER(pets.name) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    const pets = await query.getMany();
    return pets;
  }
  async addPet(addPetDto: AddPetDto): Promise<PetEntity> {
    const {
      name,
      owner,
      contact,
      status,
      dateOfAdmission,
      dateOfDischarge,
      items,
    } = addPetDto;
    console.log(this.petRepository);
    const addPet = this.petRepository.create({
      name,
      owner,
      contact,
      status,
      dateOfAdmission,
      dateOfDischarge,
      items,
    });
    await this.petRepository.save(addPet);
    return addPet;
  }
  async getPetById(id: string): Promise<PetEntity> {
    console.log("Inside getpetsbyId");
    
    const found = await this.petRepository.findOne({ where: { id: id } });
    if (found) return found;
    else {
      throw new NotFoundException();
    }
  }

  async deletePetDetails(id: string): Promise<void> {
    const result = await this.petRepository.delete(id);
    console.log(result);
    if (result.affected === 0) throw new NotFoundException('Not found');
  }

  async updatePetDetails(
    id: string,
    updateDto: UpdatePetItemsDto,
  ): Promise<PetEntity> {
    console.log(updateDto);
    const { status, items } = updateDto;
    console.log(status, items);
    const pet = await this.petRepository.findOne({ where: { id: id } });
    console.log(Array.isArray(items));
    pet.status = status;
    if (!Array.isArray(pet.items)) {
      pet.items = [];
    }
    pet.items.push(...items);
    console.log(pet);

    await this.petRepository.save(pet);
    return pet;
  }
}
