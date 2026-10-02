import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDomain } from '../../domain/user.domain';
import { UserMapper } from '../../mappers/user.mapper';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Role } from '@app/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<UserDomain | null> {
    const user = await this.repository.findOne({
      where: { id },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async create(user: UserDomain): Promise<UserDomain> {
    const entity = UserMapper.toEntity(user);

    const saved = await this.repository.save(entity);

    return UserMapper.toDomain(saved);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDomain> {
    await this.repository.update(id, dto);

    const updatedEntity = await this.repository.findOne({ where: { id } });

    if (!updatedEntity) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }

    return UserMapper.toDomain(updatedEntity);
  }

  async updateRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ): Promise<void> {
    await this.repository.update(userId, {
      hashedRefreshToken,
    });
  }

  //FIND ALL USERS
  async findAll(): Promise<UserDomain[]> {
    const users = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  //UPDATE ROLE
  async updateRole(userId: string, role: Role) {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role;

    const updatedUser = await this.repository.save(user);

    return UserMapper.toDomain(updatedUser);
  }

  //DELETE USER
  async deleteUser(userId: string): Promise<void> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.repository.remove(user);
  }
}
