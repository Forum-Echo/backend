import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PictureService {
  uploadProfileImage(imageName: string): any {
    const file = fs.readFileSync(`./src/modules/users/cache/${imageName}`);

    console.log(file);
  }
}
