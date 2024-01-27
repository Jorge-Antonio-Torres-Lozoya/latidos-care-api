import { Test, TestingModule } from '@nestjs/testing';
import { UserTrackingValueController } from './user-tracking-value.controller';

describe('UserTrackingValueController', () => {
  let controller: UserTrackingValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTrackingValueController],
    }).compile();

    controller = module.get<UserTrackingValueController>(
      UserTrackingValueController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
