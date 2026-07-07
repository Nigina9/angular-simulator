import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../service/local-storage.service';
import { catchError, Observable, tap, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IToken } from './login/IToken';
import { IAuthUser } from './IAuthUser';
import { IAuthResponse } from './IAuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorage: LocalStorageService = inject(LocalStorageService);

  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private authorizedUserSubject: BehaviorSubject<IAuthUser | null> =
    new BehaviorSubject<IAuthUser | null>(null);

  authorizedUser$: Observable<IAuthUser | null> = this.authorizedUserSubject.asObservable();

  private apiUrl: string = 'https://dummyjson.com/auth';

  login(username: string, password: string): Observable<IAuthResponse | null> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: IAuthResponse) => {
        this.localStorage.saveValue('tokens', {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });
        this.authorizedUserSubject.next(response);
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  getToken(): string | null {
    return this.localStorage.getValue<string>('tokens');
  }

  logout(): void {
    this.localStorage.removeKey('tokens');
    this.authorizedUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<IToken> {
    const token: string | null = this.localStorage.getValue<string>('tokens');
    return this.http.post<IToken>(`${this.apiUrl}/refresh`, { refreshToken: token }).pipe(
      tap((response: IToken) => {
        this.localStorage.saveValue('tokens', {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });
      }),
    );
  }

  getUser(): Observable<IAuthUser | null> {
    return this.http.get<IAuthUser>(`${this.apiUrl}/me`).pipe(
      tap((user: IAuthUser) => {
        this.authorizedUserSubject.next(user);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  getCurrentUser(): IAuthUser | null {
    return this.authorizedUserSubject.getValue();
  }

  initAuth(): Observable<IAuthUser | null> {
    const token: string | null = this.getToken();
    if (!token) {
      return of(null);
    }
    return this.getUser();
  }
}
