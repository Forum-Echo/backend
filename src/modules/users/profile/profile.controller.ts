import { Body, Controller, Get, Param, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ThrottlerGuard } from "@nestjs/throttler";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt.guard";
import { UserGuard } from "src/modules/auth/guard/user.guard";
import { VerifyGuard } from "src/modules/auth/guard/verify.guard";
import { SharpPipe } from "./services/pipes/sharp.pipe";
import { ProfileService } from "./services/profile.service";

@UseGuards(ThrottlerGuard)
@Controller('user/profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) {}

  // POST /upload
  @UseGuards(JwtAuthGuard, UserGuard, VerifyGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('profile-picture'))
  uploadFile(
    @UploadedFile(SharpPipe) file: string,
    @Request() req: any
  ): Promise<any> {
    return this.profileService.uploadPicture(file, req.user.id);
  }

  // GET /getpicture/:userId
  @Get('getpicture/:userId')
  async getPicture(@Param('userId') userId: string): Promise<any> {
    return this.profileService.getPicture(userId);
  }

  // PATCH /bio
  @UseGuards(JwtAuthGuard, UserGuard, VerifyGuard)
  @Patch('bio')
  async editBio(
    @Body('userId') userId: string,
    @Body('content') content: string
  ): Promise<any> {
      return this.profileService.editBio(userId, content);
  }

  // PATCH /status
  @UseGuards(JwtAuthGuard, UserGuard, VerifyGuard)
  @Patch('status')
  async editStatus(
    @Body('userId') userId: string,
    @Body('content') content: string,
    @Body('emoji') emoji: string,
  ): Promise<any> {
      return this.profileService.editStatus(userId, content, emoji);
  }
}