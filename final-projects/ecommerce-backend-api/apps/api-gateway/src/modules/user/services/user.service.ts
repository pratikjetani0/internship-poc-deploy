import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDomain } from '../domain/user.domain';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async create(user: UserDomain) {
    return await this.userRepository.create(user);
  }

  async updateRefreshToken(userId: string, hashedRefreshToken: string | null) {
    return await this.userRepository.updateRefreshToken(
      userId,
      hashedRefreshToken,
    );
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toResponse(user);
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(userId, dto);

    return UserMapper.toResponse(updatedUser);
  }

  // GET ALL USERS
  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return users.map((user) => UserMapper.toResponse(user));
  }

  // GET USER BY ID
  async getUserById(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toResponse(user);
  }

  // UPDATE USER ROLE
  async updateRole(userId: string, dto: UpdateUserRoleDto) {
    const user = await this.userRepository.updateRole(userId, dto.role);

    return UserMapper.toResponse(user);
  }

  // DELETE USER
  async deleteUser(userId: string) {
    await this.userRepository.deleteUser(userId);

    return {
      message: 'User deleted successfully',
    };
  }
}
