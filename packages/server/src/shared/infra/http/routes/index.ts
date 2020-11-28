import { Router } from 'express';

import postsRouter from '@modules/posts/infra/http/routes/posts.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionssRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/posts', postsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionssRouter);

routes.use('/', (req, res) => res.send('hello'));

export default routes;
