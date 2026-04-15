import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, map, filter, combineLatest } from 'rxjs';
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

  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();
  private filterSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.users$,
    this.filterSubject.asObservable()
  ]).pipe(
      map(([users, query]) =>
        users.filter(user =>
          user.name.toLowerCase().includes((query ?? '').toLowerCase())
        )
      )
  );

  saveUsersToStorage(users: IUser[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersFromStorage(): IUser[] | null {
    const users: string | null = localStorage.getItem('users');
    return users ? JSON.parse(users) : null;
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
    let usersFromStorage: IUser[] | null = this.getUsersFromStorage();
    if (usersFromStorage) {
      return of(usersFromStorage);
    } else {
      this.loaderService.showLoader();
      return this.userApi.getUsers()
        .pipe(
          catchError(() => {
            this.messageService.showError('Нет пользователей для отображения');
            return of([]);
          }),
          finalize(() => this.loaderService.hideLoader()),
        )
    }
  }

  onDeleteUser(id: number): void {
    const currentUsers: IUser[] = this.userSubject.getValue().filter((user: IUser) => user.id !== id);
    this.userSubject.next(currentUsers);
    this.saveUsersToStorage(this.userSubject.getValue());
  }

  addNewUser(user: IUser): void {
    const currentValues: IUser[] = this.userSubject.getValue();
    this.userSubject.next([...currentValues, user]);
    this.saveUsersToStorage(this.userSubject.getValue());
  }

  refreshUsers(): Observable<IUser[]> {
    this.clearStorage();
    return this.loadUsers();
  }

  setFilter(query: string | null): void {
    this.filterSubject.next(query);
  }

}
