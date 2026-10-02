import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'pratik@test.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password@123',
  })
  @IsString()
  password!: string;
}
