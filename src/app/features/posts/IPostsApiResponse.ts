import { IPost } from './IPost';

export interface IPostsApiResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}
