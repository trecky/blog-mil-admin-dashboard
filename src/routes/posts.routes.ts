import { Router } from 'express';
import { parseISO } from 'date-fns';

import PostsRepository from '../repositories/PostsRepository';
import CreatePostService from '../services/CreatePostService';

const postsRouter = Router();

const postRepository = new PostsRepository();

postsRouter.get('/', (request, response) => {
  const posts = postRepository.all();

  return response.json(posts);
});

postsRouter.post('/', (request, response) => {
  try {
    const { author, date } = request.body;

    const parsedDate = parseISO(date);
    const createpost = new CreatePostService(postRepository);

    const post = createpost.execute({
      date: parsedDate,
      author,
    });

    return response.json(post);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default postsRouter;
