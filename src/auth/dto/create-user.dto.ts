import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDTO {
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
