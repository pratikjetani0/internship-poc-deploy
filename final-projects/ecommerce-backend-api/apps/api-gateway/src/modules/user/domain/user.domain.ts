import { Role } from '@app/common';

export type UserDomainProps = {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  hashedRefreshToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserDomain {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  hashedRefreshToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: UserDomainProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.role = props.role;
    this.hashedRefreshToken = props.hashedRefreshToken ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }
}
