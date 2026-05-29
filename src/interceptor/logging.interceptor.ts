import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = Date.now();
  const logMessage: string = `${ req.method } ${ req.url }`;
  return next(req)
    .pipe(
      tap((response: HttpEvent<unknown>) => {
        const requestTime: number = Date.now() - startTime;
        if (response instanceof HttpResponse) {
          console.log(`Request success: ${ logMessage } - ${ response.status } - ${ requestTime }ms`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const requestTime: number = Date.now() - startTime;
        console.log(`Request failed: ${ logMessage } - ${ error.status } - ${ requestTime }ms`);
        return throwError(() => error);
      })
    )
};
