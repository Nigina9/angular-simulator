import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

 http: HttpClient = inject(HttpClient);
 apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

 getUsers(): Observable<IUser[]> {
  return this.http.get<IUser[]>(this.apiUrl);
 }

}
