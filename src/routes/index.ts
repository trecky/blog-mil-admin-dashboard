import { Router } from 'express';

import postsRouter from './posts.routes';
import usersRouter from './users.routes';
import sessionssRouter from './sessions.routes';

const routes = Router();

routes.use('/posts', postsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionssRouter);

export default routes;
