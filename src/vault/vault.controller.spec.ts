import { Test, TestingModule } from '@nestjs/testing';
import { VaultController } from './vault.controller';
import { VaultService } from './vault.service';

describe('AppController', () => {
  let appController: VaultController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VaultController],
      providers: [VaultService],
    }).compile();

    appController = app.get<VaultController>(VaultController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getVault('')).toBe('Hello World!');
    });
  });
});
