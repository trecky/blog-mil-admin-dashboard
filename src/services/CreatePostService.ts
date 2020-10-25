import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Post from '../models/Post';
import PostsRepository from '../repositories/PostsRepository';

interface Request {
  author_id: string;
  date: Date;
}

class CreatePostService {
  public async execute({ date, author_id }: Request): Promise<Post> {
    const postsRepository = getCustomRepository(PostsRepository);

    const postDate = startOfHour(date);

    const findPostInSameDate = await postsRepository.findByDate(postDate);

    if (findPostInSameDate) {
      throw Error('This post is already booked');
    }

    const post = postsRepository.create({
      author_id,
      date: postDate,
    });

    await postsRepository.save(post);

    return post;
  }
}

export default CreatePostService;
