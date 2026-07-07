import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostsApiResponse } from './IPostsApiResponse';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostsApiResponse> {
    return this.http.get<IPostsApiResponse>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }`);
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiUrl }/${ id }`);
  }

  updatePost(id: number, data: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`${ this.apiUrl }/${ id }`, data);
  }

  deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.apiUrl }/${ id }`);
  }

  createPost(data: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.apiUrl }/add`, data);
  }

}
