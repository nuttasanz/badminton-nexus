import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { REGEX } from 'src/common/constants/regex.constant';
// import { VALIDATION_MESSAGES } from 'src/common/constants/message.constant'; //! Uncomment this code if want a custom error message.

export class CreateAdminDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Matches(REGEX.NAME)
  // @Matches(REGEX.NAME, { message: VALIDATION_MESSAGES.NAME.INVALID })
  firstName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Matches(REGEX.NAME)
  // @Matches(REGEX.NAME, { message: VALIDATION_MESSAGES.NAME.INVALID })
  lastName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Matches(REGEX.DISPLAY_NAME)
  // @Matches(REGEX.DISPLAY_NAME, {
  //   message: VALIDATION_MESSAGES.NAME.DISPLAY_NAME_INVALID,
  // })
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @Matches(REGEX.USERNAME)
  // @IsNotEmpty({ message: VALIDATION_MESSAGES.USERNAME.REQUIRED })
  // @MinLength(4, { message: VALIDATION_MESSAGES.USERNAME.MIN_LENGTH })
  // @Matches(REGEX.USERNAME, {
  //   message: VALIDATION_MESSAGES.USERNAME.INVALID,
  // })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  // @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT })
  // @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL.REQUIRED })
  email: string;

  @IsString()
  @IsOptional()
  @Length(10)
  @IsNotEmpty()
  @Matches(REGEX.PHONE_NUMBER)
  // @Matches(REGEX.PHONE_NUMBER, {
  //   message: '',
  // })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(REGEX.PASSWORD)
  // @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD.REQUIRED })
  // @MinLength(8, { message: VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH })
  // @Matches(REGEX.PASSWORD, {
  //   message: VALIDATION_MESSAGES.PASSWORD.INVALID,
  // })
  password: string;
}
