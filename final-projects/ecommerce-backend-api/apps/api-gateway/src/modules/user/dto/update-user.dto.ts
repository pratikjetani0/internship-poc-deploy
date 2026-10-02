import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Pratik Jetani',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    example: 'pratik@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
