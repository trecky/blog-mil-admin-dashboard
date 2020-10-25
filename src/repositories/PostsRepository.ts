import { EntityRepository, Repository } from 'typeorm';
import Post from '../models/Post';

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {
  public async findByDate(date: Date): Promise<Post | null> {
    const findPost = await this.findOne({
      where: { date },
    });

    return findPost || null;
  }
}

export default PostsRepository;
