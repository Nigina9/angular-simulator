import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from '../service/message.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const messageService: MessageService = inject(MessageService);

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 500) {
          messageService.showError('Ошибка соединения');
        }
        return throwError(() => error);
      }),
    )
};
