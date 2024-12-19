import { Test, TestingModule } from '@nestjs/testing';
import { CorridaController } from './corrida.controller';
import { CorridaService } from './corrida.service';

describe('CorridaController', () => {
  let controller: CorridaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorridaController],
      providers: [CorridaService],
    }).compile();

    controller = module.get<CorridaController>(CorridaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
