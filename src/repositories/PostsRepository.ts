import { isEqual } from 'date-fns';
import Post from '../models/Post';

interface CreatePostDTO {
  author: string;
  date: Date;
}

class PostsRepository {
  private posts: Post[];

  constructor() {
    this.posts = [];
  }

  // provider: string, date: Date
  public create({ author, date }: CreatePostDTO): Post {
    const post = new Post({ author, date });

    this.posts.push(post);

    return post;
  }

  public findByDate(date: Date): Post | null {
    const findPost = this.posts.find(post => isEqual(date, post.date));

    return findPost || null;
  }

  public all(): Post[] {
    return this.posts;
  }
}

export default PostsRepository;
