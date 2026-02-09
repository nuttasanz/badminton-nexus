import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { REGEX } from 'src/common/constants/regex.constant';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @Matches(REGEX.USERNAME)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(REGEX.PASSWORD)
  readonly password: string;
}
