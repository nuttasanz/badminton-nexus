import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from 'src/users/dto/create-admin.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ResponseMessage('Login successfully')
  signIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }

  @Post('createAdmin')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }
}
