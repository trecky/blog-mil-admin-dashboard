import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  author_id: string;
  date: Date;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository') private postsRepository: IPostsRepository,
  ) {}

  public async execute({ date, author_id }: IRequest): Promise<Post> {
    const postDate = startOfHour(date);

    const findPostInSameDate = await this.postsRepository.findByDate(postDate);

    if (findPostInSameDate) {
      throw new AppError('This post is already booked');
    }

    const post = await this.postsRepository.create({
      author_id,
      date: postDate,
    });

    return post;
  }
}

export default CreatePostService;
