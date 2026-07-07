import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { IToken } from './login/IToken';
import { HttpErrorResponse } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService: AuthService = inject(AuthService);
  const currentToken: string | null = authService.getToken();

  if (!currentToken) {
    return next(req);
  }

  const cloneRequest: HttpRequest<unknown> = addToken(req, currentToken);

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }
      return authService.refreshToken().pipe(
        switchMap((tokens: IToken) => {
          const newRequest: HttpRequest<unknown> = addToken(req, tokens.accessToken);
          return next(newRequest);
        }),
        catchError((refreshError: HttpErrorResponse) => {
          authService.logout();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};

function addToken(req: HttpRequest<unknown>, token: string) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
