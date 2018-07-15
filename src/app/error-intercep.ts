import { Injectable } from '../../node_modules/@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '../../node_modules/@angular/common/http';
import { MatDialog } from '../../node_modules/@angular/material';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dailog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          let errorMassage = 'An unkhown error na';
          if (error.error.message) {
            errorMassage = error.error.message;
          }
          this.dailog.open(ErrorComponent, { data: { message: errorMassage}});
          return throwError(error);
        }
      )
    );
  }
}
