import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateUserRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  @IsEnum(Role)
  role!: Role;
}
