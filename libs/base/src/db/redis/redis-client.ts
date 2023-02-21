import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis'
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@libs/base/common/logger/logger.service';
import { Utils } from '@libs/base/common';

@Injectable()
export class RedisClient {
  private client: Redis;

  constructor(
    private readonly configuration: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.configuration = configuration;
    this.client = this.getConnection();
  }

  private getConnection(): Redis {
    const { host, port, password, redisErrorCounterLimit } =
      this.configuration.get('redis');

    let errorMaxRetry = 0;
    const redis = new Redis(port, host, { password });
    redis
      .on('error', (error) => {
        errorMaxRetry++;
        if (errorMaxRetry > redisErrorCounterLimit) {
          this.loggerService.error(
            'Redis error encontered!, Quitting gracefully',
            error,
          );
          Utils.killGracefully();
        } else {
          this.loggerService.error(
            'Redis error encountered! Trying to reconnect...\n',
            error,
          );
        }
      })
      .on('ready', () => {
        if (process.env.NODE_ENV !== 'test') {
          this.loggerService.info('Connected to Redis!');
        }
      });

    redis.info();
    return redis;
  }

  set(key: string, value: any, expireIn?: number): boolean {
    return expireIn
      ? !!this.client.set(key, value, 'EX', expireIn)
      : !!this.client.set(key, value);
  }

  get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  remove(key: string): Promise<number> {
    return this.client.del(key);
  }

  ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }
}
