import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
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

  saveUsersToStorage(users: IUser[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersFromStorage(): IUser[] | null {
    const data: string | null = localStorage.getItem('users');
    return data ? JSON.parse(data) : null;
  }

  clearStorage(): void {
    localStorage.removeItem('users');
  }

  setUsers(users: IUser[]): void {
    this.userSubject.next(users);
    this.saveUsersToStorage(users);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    let usersStorage: IUser[] | null = this.getUsersFromStorage();
    if (usersStorage) {
      return of(usersStorage);
    } else {
      this.loaderService.showLoader();
      return this.userApi.getUsers()
        .pipe(
          catchError((error) => {
            this.messageService.showError('Нет пользователей для отображения');
            return of([]);
          }),
          finalize(() => this.loaderService.hideLoader()),
        )
    }
  }

  deleteUser(user: IUser): void {
    const currentUsers: IUser[] = this.userSubject.getValue().filter(u => u !== user);
    this.userSubject.next(currentUsers);
    this.saveUsersToStorage(this.userSubject.getValue());
  }

  addNewUser(user: IUser): void {
    const currentValues: IUser[] = this.userSubject.getValue();
    this.userSubject.next([...currentValues, user,]);
    this.saveUsersToStorage(this.userSubject.getValue());
  }

  refreshUsers(): Observable<IUser[]> {
    this.clearStorage();
    return this.loadUsers();
  }

}
