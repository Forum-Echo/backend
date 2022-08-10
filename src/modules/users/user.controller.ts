import {
  Body,
  Controller,
  Delete,
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
import { UserService } from './services/user.service';
import { UserGuard } from '../auth/guard/user.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerService: RegisterService,
    private readonly userService: UserService,
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
  async login(@Request() req): Promise<any> {
    const token = await this.authService.login(req.user);
    const user_id = await this.userService.getUserByName(req.user.username);

    return {
      access_token: token,
      id: user_id._id,
    };
  }

  // PATCH /edit
  @UseGuards(JwtAuthGuard, UserGuard)
  @Patch('edit')
  edit(
    @Request() req: any,
    @Body('new_password') new_password: string,
    @Body('new_username') new_username: string,
  ): any {
    return this.userService.editUser(req.user.id, new_password, new_username);
  }

  // GET /get
  @UseGuards(JwtAuthGuard, UserGuard)
  @Get('get')
  async getUser(@Request() req: any): Promise<any> {
    const user = await this.userService.getUserById(req.user.id);

    return { username: user.username, email: user.email, role: user.role };
  }

  @Get('getuser/:user_id')
  async getUserById(@Param('user_id') user_id): Promise<any> {
    const user = await this.userService.getUserById(user_id);

    return { username: user.username, email: user.email, role: user.role };
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete('')
  async deleteUser(@Request() req: any) {
    return this.userService.deleteUser(req.user.id);
  }
}
