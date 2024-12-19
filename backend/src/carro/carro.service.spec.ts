import { Test, TestingModule } from '@nestjs/testing';
import { CarroService } from './carro.service';

describe('CarroService', () => {
  let service: CarroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarroService],
    }).compile();

    service = module.get<CarroService>(CarroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
