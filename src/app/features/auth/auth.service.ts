import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../../service/message.service';
import { LocalStorageService } from '../../../service/local-storage.service';
import { IAuth } from './IAuth';
import { catchError, Observable, tap, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IToken } from './login/IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private messageService: MessageService = inject(MessageService);
  private localStorage: LocalStorageService = inject(LocalStorageService);

  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private authorizedUserSubject: BehaviorSubject<IAuth | null> = new BehaviorSubject<IAuth | null>(null);
  authorizedUser$: Observable<IAuth | null> = this.authorizedUserSubject.asObservable();

  private apiUrl: string = 'https://dummyjson.com/auth/';

  login(username: string, password: string): Observable<IAuth | null> {
    return this.http.post<IAuth>(`${ this.apiUrl }login`, { username, password }).pipe(
      tap((response: IAuth) => {
        this.localStorage.saveValue('accessToken', response.accessToken);
        this.localStorage.saveValue('refreshToken', response.refreshToken);
        this.authorizedUserSubject.next(response);
        this.messageService.showSuccess("Вы авторизованы");
      }),
      catchError(() => {
        this.messageService.showError('Ошибка доступа');
        return of(null);
      })
    )
  }

  getToken(): string | null {
    return this.localStorage.getValue<string>('accessToken');
  }

  logout(): void {
    this.localStorage.removeKey('accessToken');
    this.localStorage.removeKey('refreshToken');
    this.authorizedUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<IToken> {
    const token: string | null = this.localStorage.getValue<string>('refreshToken');
    return this.http.post<IToken>(`${ this.apiUrl }refresh`, { refreshToken: token }).pipe(
      tap((response: IToken) => {
        this.localStorage.saveValue('accessToken', response.accessToken);
        this.localStorage.saveValue('refreshToken', response.refreshToken);
      })
    )
  }

  getUser(): Observable<IAuth | null> {
    return this.http.get<IAuth>(`${ this.apiUrl }me`).pipe(
      tap((user: IAuth) => {
        this.authorizedUserSubject.next(user);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    )
  }

  initAuth(): Observable<IAuth | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    return this.getUser();
  }

}
