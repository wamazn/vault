import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RedisClient } from '@libs/base/db/redis/redis-client';
import { VaultDTO } from './dto';
import { VaultValue } from './model/vault.model';
import { LoggerService } from '@libs/base/common';

@Injectable()
export class VaultService {
  constructor(private redis: RedisClient, private logger: LoggerService) {}

  async patchVaultRegister(dto: VaultDTO): Promise<VaultValue> {
    let vaultValue = null;
    if (dto.key) {
      vaultValue = await this.getVault(dto.key);
      vaultValue.setValue(dto.value);
      this.redis.set(vaultValue.key, vaultValue.toJson());
    } else {
      vaultValue = VaultValue.fromDTO(dto);
      this.redis.set(vaultValue.key, vaultValue.toJson());
    }
    return vaultValue;
  }

  async getVault(key: string) {
    const result = await this.redis.get(key);
    if (!result) {
      this.logger.error(`No value found for Key: ${key}`);
      throw new HttpException(
        `Key: '${key}' was not found in vault`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return VaultValue.fromJson(key, result);
    }
  }

  async deleteVault(key: string) {
    const result = await this.redis.remove(key);
    if (result === 0) {
      this.logger.error(`No value deleted for Key: ${key}`);
      throw new HttpException(
        `Key: '${key}' was not found in vault`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
