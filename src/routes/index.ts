import { Router } from 'express';

import postsRouter from './posts.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/posts', postsRouter);
routes.use('/users', usersRouter);

export default routes;
