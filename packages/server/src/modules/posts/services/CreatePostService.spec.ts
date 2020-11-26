import AppError from '@shared/errors/AppError';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import CreatePostService from './CreatePostService';

describe('CreatePost', () => {
  it('should be able a new post', async () => {
    const fakePostsRepository = new FakePostsRepository();
    const createPost = new CreatePostService(fakePostsRepository);

    const post = await createPost.execute({
      date: new Date(),
      author_id: '11111',
    });

    expect(post).toHaveProperty('id');
    expect(post.author_id).toBe('11111');
  });

  it('should bot be able a new post on time', async () => {
    const fakePostsRepository = new FakePostsRepository();
    const createPost = new CreatePostService(fakePostsRepository);

    const postDate = new Date(2020, 4, 10, 11);

    await createPost.execute({
      date: postDate,
      author_id: '11111',
    });

    expect(
      createPost.execute({
        date: postDate,
        author_id: '11111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
