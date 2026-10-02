import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

import { UserDomain } from '../domain/user.domain';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { Role } from '@app/common';

export class UserMapper {
  static fromDto(dto: CreateUserDto, passwordHash: string): UserDomain {
    return new UserDomain({
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: Role.USER,
    });
  }

  static toDomain(entity: UserEntity): UserDomain {
    return new UserDomain({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      passwordHash: entity.passwordHash,
      role: entity.role,
      hashedRefreshToken: entity.hashedRefreshToken,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(domain: UserDomain): UserEntity {
    const entity = new UserEntity();

    entity.id = domain.id ?? entity.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.passwordHash = domain.passwordHash;
    entity.role = domain.role;
    entity.hashedRefreshToken = domain.hashedRefreshToken;

    return entity;
  }

  static toUpdateEntity(dto: UpdateUserDto): Partial<UserEntity> {
    const entity: Partial<UserEntity> = {};

    if (dto.name !== undefined) {
      entity.name = dto.name;
    }

    if (dto.email !== undefined) {
      entity.email = dto.email;
    }

    return entity;
  }

  static toResponse(domain: UserDomain): UserResponseDto {
    return {
      id: domain.id ?? '',
      name: domain.name,
      email: domain.email,
      role: domain.role,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
    };
  }
}
