import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as MaskJson from 'mask-json';

const optionsMaks = {
  ignoreCase: false, // Whether to ignore case sensitivity when matching keys
  replacement: '**********', // The default value to replace
};
const maskJson = MaskJson(
  (process.env.SENSITIVE_DATA || 'password').split('|'), // values to mask separated by pipe
  optionsMaks,
);

@Injectable()
export class LoggerService {
  private internalLogger: winston.Logger;

  constructor() {
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'cyan',
      debug: 'green',
    });

    const format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((log) => {
        return `${log.timestamp}| [${log.level.toUpperCase()}] | ${
          log.message
        } ${
          (log.message as unknown) instanceof Error
            ? (log.message as unknown as Error).stack
            : ''
        } | ${JSON.stringify(log.metadata ?? {})}`;
      }),
      winston.format.colorize({ all: true }),
    );

    const logConfiguration = {
      transports: [new winston.transports.Console()],
      format,
    };
    this.internalLogger = winston.createLogger(logConfiguration);
    this.internalLogger.level = this.logLevel();
  }

  static maskData(args: any): any {
    //for nested objects/properties
    return maskJson(args, optionsMaks);
  }

  info(message: any, args?: any): void {
    this.internalLogger.info(message, {
      metadata: LoggerService.maskData(args),
    });
  }

  warn(message: any, args?: any): void {
    this.internalLogger.warn(message, {
      metadata: LoggerService.maskData(args),
    });
  }

  error(message: any, args?: any): void {
    const params =
      args instanceof Error
        ? { error: LoggerService.maskData(args) }
        : { metadata: LoggerService.maskData(args) };

    this.internalLogger.error(message, params);
  }

  debug(message: any, args?: any): void {
    this.internalLogger.debug(message, {
      metadata: LoggerService.maskData(args),
    });
  }

  trace(message: any, args?: any): void {
    this.internalLogger.silly(message, {
      metadata: LoggerService.maskData(args),
    });
  }

  logLevel(): string {
    return process.env.LOG_LEVEL!;
  }
}
