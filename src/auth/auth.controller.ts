import { Body, Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
//yarn nest g controller auth --no-spec
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  signUp(@Body() createUser: CreateUserDTO): Promise<void> {
    return this.authService.createUser(createUser);
  }
  @Post('/signin')
  signin(@Body() createUser: CreateUserDTO): Promise<{ accessToken: string }> {
    return this.authService.signin(createUser);
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('Logged', req);
  }
}
