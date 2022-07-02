import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { RegisterService } from './services/register.service';
import { LocalAuthGuard } from '../auth/guard/local.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerService: RegisterService,
  ) {}

  // POST /register
  @Post('register')
  register(
    @Body('username') username,
    @Body('password') password,
    @Body('email') email,
  ): any {
    return this.registerService.register(username, password, email);
  }

  // POST /login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  // GET /protected
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req): string {
    return req.user;
  }
}
