import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

import Post from '../../infra/typeorm/entities/Post';

class PostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findByDate(date: Date): Promise<Post | undefined> {
    const findPost = this.posts.find(post => isEqual(post.date, date));

    return findPost;
  }

  public async create({ author_id, date }: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, { id: uuid(), date, author_id });

    this.posts.push(post);

    return post;
  }
}

export default PostsRepository;
