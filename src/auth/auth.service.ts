import { CreateAdminDto } from './../users/dto/create-admin.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/common/services/hash.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUser(username, pass);
    if (!user)
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  private async validateUser(
    username: string,
    pass: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOneWithPassword(username);
    if (!user) return null;

    const isPasswordMatch = await this.hashService.compare(pass, user.password);
    if (!isPasswordMatch) return null;

    return user;
  }

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }
}
