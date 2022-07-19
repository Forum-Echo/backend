import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../models/post.model';

interface Return {
  success: object | string | object[];
}

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async getAllPosts(): Promise<object[]> {
    return this.postModel.find();
  }

  async getPostById(post_id: string): Promise<any> {
    return this.postModel.findById(post_id);
  }

  async createPost(
    id: string,
    title: string,
    content: string,
  ): Promise<Return> {
    if (!id || !title || !content) {
      throw new BadRequestException();
    }

    const newPost = new this.postModel({
      title: title,
      content: content,
      authorId: id,
      likedBy: [],
      dislikedBy: [],
      created: new Date(),
      updated: null,
    });

    let posts;

    posts = await this.postModel.find({ title: newPost.title });
    if (posts[0]) {
      return { success: 'title_already_used' };
    }

    posts = await this.postModel.find({ content: newPost.content });
    if (posts[0]) {
      return { success: 'content_already_used' };
    }

    const result = await newPost.save();

    return { success: result.id };
  }

  async deletePost(post_id: string, authorId: string): Promise<any> {
    const post = await this.getPostById(post_id);
    if (!post) {
      throw new NotFoundException();
    }

    if (post.authorId !== authorId) {
      throw new UnauthorizedException();
    }

    const result = await this.postModel.findByIdAndDelete(post_id);
    return { success: result };
  }

  async editPost(
    post_id: string,
    authorId: string,
    title: string,
    content: string,
  ): Promise<any> {
    const post = await this.getPostById(post_id);

    if (!post) {
      throw new NotFoundException('user_not_found');
    }

    if (post.authorId !== authorId) {
      throw new UnauthorizedException();
    }

    const checkNewPost = await this.createPost(authorId, title, content);

    if (typeof checkNewPost.success === 'string') {
      return { error: 'post_already_exists' };
    }

    post.title = title;
    post.content = content;
    post.updated = new Date();

    return await post.save();
  }
}
