import { startOfHour } from 'date-fns';

import Post from '../models/Post';
import PostsRepository from '../repositories/PostsRepository';

interface RequestDTO {
  date: Date;
  author: string;
}

class CreatePostService {
  private postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this.postsRepository = postsRepository;
  }

  public execute({ date, author }: RequestDTO): Post {
    const postDate = startOfHour(date);

    const findPostInSameDate = this.postsRepository.findByDate(postDate);

    if (findPostInSameDate) {
      throw Error('This post is already booked');
    }

    const post = this.postsRepository.create({
      author,
      date: postDate,
    });

    return post;
  }
}

export default CreatePostService;
