import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostController';

const postsRouter = Router();
const postController = new PostsController();

postsRouter.use(ensureAuthenticated);

postsRouter.post('/', postController.create);

export default postsRouter;
