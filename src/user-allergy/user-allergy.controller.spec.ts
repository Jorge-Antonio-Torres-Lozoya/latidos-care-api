import { Test, TestingModule } from '@nestjs/testing';
import { UserAllergyController } from './user-allergy.controller';

describe('UserAllergyController', () => {
  let controller: UserAllergyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAllergyController],
    }).compile();

    controller = module.get<UserAllergyController>(UserAllergyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
