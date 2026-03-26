import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, delay } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<IUser[]>= new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();
  loaderService: LoaderService = inject(LoaderService);
  userApi:UserApiService = inject(UserApiService);
  messageService: MessageService = inject(MessageService);

  setUsers(users: IUser[]) {
    this.userSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
   return this.users$;
  }

  loadUsers() {
    this.loaderService.showLoader();
    this.userApi.getUsers()
      .pipe(
        delay(3000),
        catchError((error) => {
          this.messageService.showError('Нет пользователей для отображения');
          return of([]);
        }),
        finalize(() =>this.loaderService.hideLoader()),
        tap(users => this.setUsers(users))
      ).subscribe();
  }

}
