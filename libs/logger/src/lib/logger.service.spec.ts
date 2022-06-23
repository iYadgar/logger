import {TestBed} from '@angular/core/testing';

import {LoggerService} from './logger.service';
import {LOGGER_CONFIG_TOKEN, LoggerConfig, Targets} from '@logger/logger';

describe('LoggerService', () => {
  let service: LoggerService;
  const targets: Targets = 'localStorage';
  const delayMs = 1000
  const messageFormat = `A new error on ${new Date().toDateString()} `;
  beforeEach(() => {
    const config: LoggerConfig = {
      targets,
      delayMs,
      messageFormat,
    }
    TestBed.configureTestingModule({providers: [{provide: LOGGER_CONFIG_TOKEN, useValue: config}]});
    service = TestBed.inject(LoggerService);
  });

  it('should be created and initialized', () => {
    expect(service).toBeTruthy();
    expect(service.target).toBe(targets)
    expect(service.delayMs).toBe(delayMs)
    expect(service.errorMessageFormat).toBe(messageFormat)
  });


  it('correctly handles error', async () => {
    const spy = jest.spyOn(service, 'log');
    const error = new Error('test error');
    service.setNewError(error);
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(service.delayMs);
    expect(spy).toBeCalled();

  });
});
