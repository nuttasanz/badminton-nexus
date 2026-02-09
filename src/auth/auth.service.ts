import { CreateAdminDto } from './../users/dto/create-admin.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneWithPassword(username);

    if (!user || user.password !== pass) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    const { password, ...result } = user;

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }
}
