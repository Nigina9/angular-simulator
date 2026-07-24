import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { applicationConfiguration } from '../app/configuration.token';
import { IApplicationConfiguration } from '../interfaces/IApplicationConfiguration';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const configuration: IApplicationConfiguration = inject(applicationConfiguration);
  const startTime: number = Date.now();
  const logMessage: string = `${ req.method } ${ req.url }`;
  const getRequestTime = (): number => Date.now() - startTime;
  return next(req).pipe(
    tap((response: HttpEvent<unknown>) => {
      if (response instanceof HttpResponse && configuration.enableLogs) {
        console.warn(`Request success: ${ logMessage } - ${ response.status } - ${ getRequestTime() }ms`);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (configuration.enableLogs) {
        console.error(`Request failed: ${ logMessage } - ${ error.status } - ${ getRequestTime() }ms`);
      }
      return throwError(() => error);
    })
  );
};
