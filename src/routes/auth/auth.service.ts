import { Injectable } from '@nestjs/common';
import { LoginService } from '../users/services/login.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: LoginService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    const hashedPassword = this.hash(password);

    if (user && user.password === hashedPassword) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.username, sub: user._id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  hash(password) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(password))
      .digest('hex');
  }
}
