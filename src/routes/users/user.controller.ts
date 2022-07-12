import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RegisterService } from './services/register.service';
import { LocalAuthGuard } from '../auth/guard/local.guard';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { EditUserService } from './services/edituser.service';
import { GetUserService } from './services/getuser.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerService: RegisterService,
    private readonly editUserService: EditUserService,
    private readonly getUserService: GetUserService,
  ) {}

  // POST /register
  @Post('register')
  register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ): any {
    return this.registerService.register(username, password, email);
  }

  // POST /login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit')
  edit(
    @Body('user_id') user_id: string,
    @Body('new_password') new_password: string,
    @Body('new_username') new_username: string,
  ): any {
    return this.editUserService.editUser(user_id, new_password, new_username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':user_id')
  getUser(@Param('user_id') user_id: string): any {
    return this.getUserService.getUser(user_id);
  }
}
