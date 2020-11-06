import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import PostsRepository from '../repositories/PostsRepository';
import CreatePostService from '../services/CreatePostService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const postsRouter = Router();

postsRouter.use(ensureAuthenticated);

postsRouter.get('/', async (request, response) => {
  const postsRepository = getCustomRepository(PostsRepository);
  const posts = await postsRepository.find();

  return response.json(posts);
});

postsRouter.post('/', async (request, response) => {
  const { author_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createpost = new CreatePostService();

  const post = await createpost.execute({
    date: parsedDate,
    author_id,
  });

  return response.json(post);
});

export default postsRouter;
