import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtInterface } from './jwt-payload-interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUserDTO): Promise<void> {
    const { username, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const addUser = this.userRepository.create({
      username,
      password: hashedPass,
    });
    try {
      await this.userRepository.save(addUser);
    } catch (error) {
      if (error.code === 23505) {
        throw new ConflictException('Usenamr exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signin(createUserDto: CreateUserDTO): Promise<{ accessToken: string }> {
    const { username, password } = createUserDto;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtInterface = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken }
    }
    else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
