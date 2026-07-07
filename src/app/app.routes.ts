import { Routes } from '@angular/router';
import { postResolver } from './features/posts/post.resolver';
import { authGuard } from './features/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./home-page/home-page.component').then((c) => c.HomePageComponent)
      },
      {
        path: 'posts',
        loadComponent: () => import('./features/posts/posts.component').then((c) => c.PostsComponent)
      },
      {
        path: 'posts/create',
        loadComponent: () =>
          import('./features/posts/post-create/post-create.component').then((c) => c.PostCreateComponent)
      },
      {
        path: 'posts/:id',
        resolve: { post: postResolver },
        loadComponent: () =>
          import('./features/posts/post-detail/post-detail.component').then((c) => c.PostDetailComponent)
      },
      {
        path: 'users-page',
        loadComponent: () => import('./users-page/users-page.component').then((c) => c.UsersPageComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent)
  }
];
