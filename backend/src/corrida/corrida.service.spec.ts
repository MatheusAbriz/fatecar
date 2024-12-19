import { Test, TestingModule } from '@nestjs/testing';
import { CorridaService } from './corrida.service';

describe('CorridaService', () => {
  let service: CorridaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorridaService],
    }).compile();

    service = module.get<CorridaService>(CorridaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
