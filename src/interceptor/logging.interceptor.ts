import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = Date.now();

  console.log(req.method, req.url);

  return next(req)
    .pipe(
      tap({
        next: (response): void => {
          const requestTime: number = Date.now() - startTime;
          if (response instanceof HttpResponse) {
            console.log(`${ req.method } ${ req.url } - ${ response.status } - ${ requestTime }ms`);
          }
        },
        error: (error: HttpErrorResponse): void => {
          console.log(error);
        }
      })
    );
};
