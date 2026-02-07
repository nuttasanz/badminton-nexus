import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString() @IsNotEmpty({ message: 'กรุณากรอกอีเมล' }) username: string;
  @IsEmail() @IsNotEmpty({ message: 'กรุณากรอกอีเมล' }) email: string;
  @IsString() @IsNotEmpty({ message: 'กรุณากรอกพาสเวิร์ด' }) password: string;
}
