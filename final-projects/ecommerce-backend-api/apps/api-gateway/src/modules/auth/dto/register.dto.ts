import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Pratik Jetani',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'pratik@test.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password@123',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
