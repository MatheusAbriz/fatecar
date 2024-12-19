import { Test, TestingModule } from '@nestjs/testing';
import { CarroController } from './carro.controller';
import { CarroService } from './carro.service';

describe('CarroController', () => {
  let controller: CarroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarroController],
      providers: [CarroService],
    }).compile();

    controller = module.get<CarroController>(CarroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
