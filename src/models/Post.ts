import { uuid } from 'uuidv4';

class Post {
  id: string;

  author: string;

  date: Date;

  constructor({ author, date }: Omit<Post, 'id'>) {
    this.id = uuid();
    this.author = author;
    this.date = date;
  }
}

export default Post;
