import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = Date.now();

  return next(req)
    .pipe(
      tap((response) => {
        const requestTime: number = Date.now() - startTime;
        if (response instanceof HttpResponse) {
          console.log(`Request success: ${ req.method } ${ req.url } - ${ response.status } - ${ requestTime }ms`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const requestTime: number = Date.now() - startTime;
        console.log(`Request failed: ${ req.method } ${ req.url } - ${ error.status } - ${ requestTime }ms`);
        return throwError(() => error);
      })
    )
};
