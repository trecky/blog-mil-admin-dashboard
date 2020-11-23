import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findByDate(date: Date): Promise<Post | undefined> {
    const findPost = await this.ormRepository.findOne({
      where: { date },
    });

    return findPost;
  }

  public async create({ author_id, date }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({ author_id, date });

    await this.ormRepository.save(post);

    return post;
  }
}

export default PostsRepository;
