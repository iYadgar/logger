import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private logger : LoggerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`****** HTTP intercept ******`);
    return next.handle(req).pipe(catchError(error => {
      this.logger.setNewError(error);
      return throwError(error);
    }))
  }

}
