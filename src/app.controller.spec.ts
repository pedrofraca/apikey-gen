import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EmailQueueService } from './services/emailqueue.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [EmailQueueService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should not crash"', () => {
      expect(appController.saveEmail("email")).toBe('Hello World!');
    });
  });
});
