import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Picture } from '../../models/picture.model';
import { Model } from 'mongoose';
import { UserService } from '../../services/user.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Picture') private readonly pictureModel: Model<Picture>,
    private readonly userService: UserService,
  ) {}

  // ---- Profile Picture ---- //
  async getPicture(userId: string): Promise<any> {
    return await this.pictureModel.findOne({ userId });
  }

  async uploadPicture(filename: string, userId: string): Promise<any> {

    // Get file from cache
    const file = fs.readFileSync(`./src/modules/users/profile/cache/${filename}`);
    
    // Delete file from cache
    fs.unlink(`./src/modules/users/cache/${filename}`, (err) => {
      return err;
    });

    // check for existing picture
    const picture = await this.getPicture(userId);

    // if picture exists => modify it
    if (picture) {
      picture.buffer = file;
      picture.filename = filename;

      const result = await picture.save();

      return { modified: result.id }; 
    }

    // Upload new picture to database
    const newPicture = new this.pictureModel({
      buffer: file,
      filename,
      userId,
    });

    // sav e the new picture
    const result = await newPicture.save();

    // Return id of file
    return { new: result._id }
  }

  // ---- Bio ---- //
  async  editBio(userId: string, content: string): Promise<any> {
    const user = await this.userService.getUserById(userId);

      if (!user) {
        throw new NotFoundException('user_not_found');
      }

      user.bio = content;

      const result = await user.save();
      return { success: result.bio };
  }
}
