import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { RedisClient } from './db/redis/redis-client';
import { LoggerService } from './common/logger/logger.service';

@Module({
  providers: [BaseService, RedisClient, LoggerService],
  exports: [BaseService, RedisClient, LoggerService],
})
export class BaseModule {}
