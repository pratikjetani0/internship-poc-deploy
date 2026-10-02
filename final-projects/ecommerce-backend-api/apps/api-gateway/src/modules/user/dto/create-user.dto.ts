import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Pratik Jetani',
    description: 'Full name of user',
  })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'pratik@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'User password',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
