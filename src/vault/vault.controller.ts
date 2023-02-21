import { Body, Controller, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { VaultService } from './vault.service';
import { VaultDTO, HistoricVaultValueDTO, CurrentValueDTO } from './dto';
import { LoggerService } from '@libs/base/common';

const LOG_PREFIX = '[VaultController] -';
@Controller()
export class VaultController {
  constructor(
    private readonly vaultService: VaultService,
    private readonly logger: LoggerService,
  ) {}

  @Get(':key')
  async getVault(@Param('key') key: string): Promise<CurrentValueDTO> {
    this.logger.info(`${LOG_PREFIX} [getVault] key: ${key}`);
    const result = await this.vaultService.getVault(key);
    return result.getCurrentValue();
  }

  @Get(':key/history')
  async getCompleteVault(
    @Param('key') key: string,
  ): Promise<HistoricVaultValueDTO> {
    this.logger.info(`${LOG_PREFIX} [getCompleteVault] key: ${key}`);
    const result = await this.vaultService.getVault(key);
    return result.toCompleteVaultDTO();
  }

  @Patch()
  async patchVault(@Body() patchKeyValDTO: any): Promise<VaultDTO> {
    this.logger.info(
      `${LOG_PREFIX} [patchVault] body received`,
      patchKeyValDTO,
    );
    const result = await this.vaultService.patchVaultRegister(patchKeyValDTO);
    return result.toVaultDTO();
  }

  @HttpCode(204)
  @Delete(':key')
  async deleteVault(@Param('key') key: string) {
    this.logger.info(`${LOG_PREFIX} [deleteVault] key: ${key}`);
    return this.vaultService.deleteVault(key);
  }
}
