import {InjectionToken} from '@angular/core';
export type Targets = 'console' | 'localStorage' | 'both';
export interface LoggerConfig {
  messageFormat: string;
  targets: Targets;
  delayMs: number;
}
export const LOGGER_CONFIG_TOKEN = new InjectionToken('LOGGER_CONFIG');
