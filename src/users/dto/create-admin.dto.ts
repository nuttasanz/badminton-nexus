import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsString() username: string;
  @IsString() password_hash: string;
  @IsString() phone_number: string;
}
