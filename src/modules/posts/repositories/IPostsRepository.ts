import Post from '../infra/typeorm/entities/Post';
import ICreatePostDTO from '../dtos/ICreatePostDTO';

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  findByDate(date: Date): Promise<Post | undefined>;
}
