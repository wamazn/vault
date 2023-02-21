import { Module } from '@nestjs/common';
import { VaultController } from './vault/vault.controller';
import { VaultService } from './vault/vault.service';
import { BaseModule } from '@libs/base';
import { ConfigModule } from '@nestjs/config';
import vaultConfig from '../config/vault.config';

@Module({
  imports: [
    BaseModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [vaultConfig],
    }),
  ],
  controllers: [VaultController],
  providers: [VaultService],
})
export class AppModule {}
