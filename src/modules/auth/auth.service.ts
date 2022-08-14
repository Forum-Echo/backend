import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserService } from '../users/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByName(username);

    const hashedPassword = this.hash(password);

    if (user && user.password === hashedPassword) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      name: user.username,
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  hash(password) {
    return crypto
      .createHash('sha512')
      .update(JSON.stringify(password))
      .digest('hex');
  }
}
