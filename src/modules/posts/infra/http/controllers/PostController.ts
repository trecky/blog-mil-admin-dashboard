import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreatePostService from '@modules/posts/services/CreatePostService';

export default class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { author_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createpost = container.resolve(CreatePostService);

    const post = await createpost.execute({
      date: parsedDate,
      author_id,
    });

    return response.json(post);
  }
}
