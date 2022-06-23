import {Inject, Injectable, Optional} from '@angular/core';
import {bufferTime, concatMap, Subject} from 'rxjs';
import {LOGGER_CONFIG_TOKEN, LoggerConfig, Targets} from './config';

@Injectable({
  providedIn: 'root',

})
export class LoggerService {
  errorsQueue$ = new Subject();
  delayMs: number = 0;
  errorMessageFormat: string = '';
  target: Targets = 'both';

  constructor(@Optional() @Inject(LOGGER_CONFIG_TOKEN) private config: LoggerConfig) {
    this.init()
  }

  init() {
    this.delayMs = this.config?.delayMs || 5000;
    this.errorMessageFormat = this.config?.messageFormat || '';
    this.target = this.config?.targets || 'both'
    this.errorsQueue$.pipe(
      bufferTime(this.delayMs),
      concatMap((error: any) => error)).subscribe((error) => {
      this.log(error)
    })

  }


  log(error: any) {
    const errorFormat = {
      message: this.errorMessageFormat + error.message,
      timestamp: Date.now(),
      stackTrace: error.stack
    }
    if (this.target === 'console' || this.target === 'both') {
      console.error(errorFormat);
    }
    if (this.target === 'localStorage' || this.target === 'both') {
      const errorsFromLocalStorage = JSON.parse(localStorage.getItem('errors') || '[]');
      localStorage.setItem('errors', JSON.stringify([...errorsFromLocalStorage, errorFormat]));
    }
  }

  setNewError(error: any) {
    this.errorsQueue$.next(error)
  }

}
