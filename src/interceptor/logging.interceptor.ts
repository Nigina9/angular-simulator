import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = Date.now();
  const logMessage: string = `${ req.method } ${ req.url }`;
  const getRequestTime = (): number => Date.now() - startTime;
  return next(req)
    .pipe(
      tap((response: HttpEvent<unknown>) => {
        if (response instanceof HttpResponse) {
          console.log(`Request success: ${ logMessage } - ${ response.status } - ${ getRequestTime() }ms`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(`Request failed: ${ logMessage } - ${ error.status } - ${ getRequestTime() }ms`);
        return throwError(() => error);
      })
    )
};
