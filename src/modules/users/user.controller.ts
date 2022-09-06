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
import { VerifyGuard } from '../auth/guard/verify.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from './profile/services/pipes/sharp.pipe';
import { ProfileService } from './profile/services/profile.service';

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
  @UseGuards(LocalAuthGuard, VerifyGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    const token = await this.authService.login(req.user);
    const user = await this.userService.getUserByName(req.user.username);

    return {
      access_token: token,
      id: user._id,
      role: user.role,
    };
  }

  // PATCH /edit
  @UseGuards(JwtAuthGuard, UserGuard, VerifyGuard)
  @Patch('edit')
  edit(
    @Request() req: any,
    @Body('new_password') new_password: string,
    @Body('new_username') new_username: string,
  ): any {
    return this.userService.editUser(req.user.id, new_password, new_username);
  }

  // GET /get
  @UseGuards(JwtAuthGuard, UserGuard, VerifyGuard)
  @Get('get')
  async getUser(@Request() req: any): Promise<any> {
    const user = await this.userService.getUserById(req.user.id);

    return { username: user.username, email: user.email, role: user.role };
  }

  // GET /getuser/:user_id
  @Get('getuser/:user_id')
  async getUserById(@Param('user_id') user_id): Promise<any> {
    const user = await this.userService.getUserById(user_id);

    return { username: user.username, email: user.email, role: user.role };
  }

  // DELETE
  @UseGuards(JwtAuthGuard, UserGuard, VerifyGuard)
  @Delete('')
  async deleteUser(@Request() req: any) {
    return this.userService.deleteUser(req.user.id);
  }

  // PATCH /verify
  @Patch('verify')
  async verifyUser(@Body('token') token): Promise<any> {
    return this.userService.verifyUser(token);
  }

  // GET forget-password/:email
  @Get('forget-password/:email')
  async forgotPassword(@Param('email') email: string): Promise<any> {
    return this.userService.sendPasswordConfirmation(email);
  }

  // PATCH reset-password
  @Patch('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('new_password') password: string,
  ): Promise<any> {
    return this.userService.resetPassword(token, password);
  }
}
