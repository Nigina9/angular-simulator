import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { PostApiService } from './post-api.service';
import { inject } from '@angular/core';
import { IPost } from './IPost';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot) => {

  const postApiService: PostApiService = inject(PostApiService);
  return postApiService.getPostById(Number(route.params['id']));

};
