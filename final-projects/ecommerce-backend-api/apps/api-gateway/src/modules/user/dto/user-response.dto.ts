import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@app/common';

export class UserResponseDto {
  @ApiProperty({
    example: 'a2f7a0e5-6f24-4f7d-b7f8-2f64f08f4d12',
  })
  id!: string;

  @ApiProperty({
    example: 'Pratik Jetani',
  })
  name!: string;

  @ApiProperty({
    example: 'pratik@gmail.com',
  })
  email!: string;

  @ApiProperty({
    enum: Role,
    example: Role.USER,
  })
  role!: Role;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
