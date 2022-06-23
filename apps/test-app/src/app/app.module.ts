import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NxWelcomeComponent} from './nx-welcome.component';
import {HttpClientModule} from '@angular/common/http';
import {LoggerConfig, LoggerModule} from '@logger/logger';
import {environment} from '../environments/environment';

const loggerConfig: LoggerConfig = {
  delayMs: 2000,
  messageFormat: `A new error on ${new Date().toDateString()} `,
  targets: 'both'
}


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, HttpClientModule,LoggerModule.forRoot(loggerConfig,environment.production)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
