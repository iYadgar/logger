import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LOGGER_CONFIG_TOKEN, LoggerConfig} from './config';
import {ErrorHandlerService} from './error-handler.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from './http-interceptor.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoggerModule {
  static forRoot(config: LoggerConfig, isProduction = true): ModuleWithProviders<LoggerModule> {
    const providers = [LoggerModule,
      {provide: ErrorHandler, useClass: ErrorHandlerService},
      {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
      {provide: LOGGER_CONFIG_TOKEN, useValue: config}]
    if (isProduction) {
      providers.push()
    }

    return {
      ngModule: LoggerModule,
      providers
    };
  }
}
