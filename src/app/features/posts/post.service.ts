import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, of, catchError} from 'rxjs';
import { IPost } from './IPost';
import { PostApiService } from './post-api.service';
import { MessageService } from '../../../service/message.service';
import { LoaderService } from '../../../service/loader.service';
import { IPostsApiResponse } from './IPostsApiResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private postApi: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);
  private loader: LoaderService = inject(LoaderService);

  private postSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  post$: Observable <IPost[]> = this.postSubject.asObservable();

  private totalSubject: BehaviorSubject <number> = new BehaviorSubject<number>(0);
  total$: Observable <number> = this.totalSubject.asObservable();

  loadPosts(limit: number, skip: number): void {
    this.loader.showLoader();
    this.postApi.getPosts(limit, skip).pipe(
      tap((response: IPostsApiResponse) => {
        this.loader.hideLoader();
        this.postSubject.next(response.posts);
        this.totalSubject.next(response.total);
      }),
      catchError(() => {
        this.messageService.showError('Ошибка');
        return of({ posts: [] });
      })
    ).subscribe();
  }

  updatePost(id: number, data:Partial<IPost>): void {
    this.postApi.updatePost(id, data).pipe(
      tap(() => {
        this.messageService.showSuccess('Пост обновлен');
      }),
      catchError(() => {
        this.messageService.showError('Ошибка обновления');
        return of(null);
      })
    ).subscribe();
  }

  onDeletePost(id: number): void {
    this.postApi.deletePost(id).pipe(
      tap(() => {
        const currentPosts: IPost[] = this.postSubject.getValue().filter((post: IPost) => post.id !== id);
        this.postSubject.next(currentPosts);
        this.messageService.showSuccess('Пост успешно удален');
      }),
      catchError(() => {
        this.messageService.showError('Ошибка удаления');
        return of(null);
      })
    ).subscribe();
  }

  createPost(data: IPost): Observable<IPost | null> {
    return this.postApi.createPost(data).pipe(
      tap(() => {
        this.messageService.showSuccess('Пост добавлен');
      }),
      catchError(() => {
        this.messageService.showError('Ошибка создания');
        return of(null);
      })
    );
  }

}


