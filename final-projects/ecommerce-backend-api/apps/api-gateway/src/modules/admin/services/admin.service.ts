import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminMapper } from '../mappers/admin.mapper';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  //GET DASHBOARD
  async getDashboard() {
    const dashboard = await this.adminRepository.getDashboard();

    return AdminMapper.toResponse(dashboard);
  }
}
