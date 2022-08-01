import { Test, TestingModule } from '@nestjs/testing';
import { SwipersController } from './swipers.controller';

describe('SwipersController', () => {
  let controller: SwipersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwipersController],
    }).compile();

    controller = module.get<SwipersController>(SwipersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
