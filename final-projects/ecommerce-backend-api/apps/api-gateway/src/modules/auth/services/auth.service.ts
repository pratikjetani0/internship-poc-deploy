import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Role } from '@app/common';
import { RegisterDto } from '../dto/register.dto';
import { UserMapper } from '../../user/mappers/user.mapper';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../types/jwt-payload.type';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  async hashData(data: string) {
    return await bcrypt.hash(data, 12);
  }

  //GENERATE TOEKNS
  async generateTokens(userId: string, email: string, role: Role) {
    const payload = { sub: userId, email, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  //REGISTER
  async register(dto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User alredy exists');
    }

    const passwordHash = await this.hashData(dto.password);

    const userDomain = UserMapper.fromDto(dto, passwordHash);

    const user = await this.userService.create(userDomain);

    this.notificationClient.emit('user_registered', {
      userId: user.id,
      email: user.email,
      name: user.name,
    }).subscribe();

    const tokens = await this.generateTokens(user.id!, user.email, user.role);

    const hashedRefreshToken = await this.hashData(tokens.refreshToken);

    await this.userService.updateRefreshToken(user.id!, hashedRefreshToken);

    return {
      accessToken: tokens.accessToken,
      user: UserMapper.toResponse(user),
      refreshToken: tokens.refreshToken,
    };
  }

  //LOGIN
  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const matches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id!, user.email, user.role);

    const hashedRefreshToken = await this.hashData(tokens.refreshToken);

    await this.userService.updateRefreshToken(user.id!, hashedRefreshToken);

    return {
      accessToken: tokens.accessToken,
      user: UserMapper.toResponse(user),
      refreshToken: tokens.refreshToken,
    };
  }

  //LOGOUT
  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);

    return {
      message: 'Logged out successfully',
    };
  }

  //REFRESH
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const payload = await this.jwtService.verifyAsync<JwtPayload>(
      refreshToken,
      {
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    const user = await this.userService.findById(payload.sub);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException();
    }

    const matches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);

    if (!matches) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(user.id!, user.email, user.role);

    const hashedRefreshToken = await this.hashData(tokens.refreshToken);

    await this.userService.updateRefreshToken(user.id!, hashedRefreshToken);

    return {
      accessToken: tokens.accessToken,
    };
  }
}
