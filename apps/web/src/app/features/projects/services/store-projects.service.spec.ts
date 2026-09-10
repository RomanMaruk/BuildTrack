import { Test, TestingModule } from '@nestjs/testing';
import { StoreProjectsService } from './store-projects.service';

describe('StoreProjectsService', () => {
  let service: StoreProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreProjectsService],
    }).compile();

    service = module.get<StoreProjectsService>(StoreProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
