import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Picture } from '../models/picture.model';
import { Model } from 'mongoose';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel('Picture') private readonly pictureModel: Model<Picture>
  ) {}

  async getPicture(userId: string): Promise<any> {
    return await this.pictureModel.findOne({ userId });
  }
}
