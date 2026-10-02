import { Role } from '@app/common';

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
};
