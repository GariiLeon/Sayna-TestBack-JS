import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  firstname: string;
  lastname: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  date_naissance: string;
  sexe: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password'] as const),
) {}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
