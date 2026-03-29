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

  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);

  userApi: UserApiService = inject(UserApiService);
  private userSubject: BehaviorSubject<IUser[]>= new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.userSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }

  loadUsers(): void {
    this.loaderService.showLoader();
    this.userApi.getUsers()
      .pipe(
        catchError((error): Observable<IUser[]> => {
          this.messageService.showError('Нет пользователей для отображения');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
        tap(users => this.setUsers(users))
      ).subscribe();
  }

}
