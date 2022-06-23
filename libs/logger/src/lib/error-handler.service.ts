import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private logger: LoggerService) {
  }

  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      console.log(`****** Exceptions handler ******`);
      this.logger.setNewError(error)
    }
  }

}
