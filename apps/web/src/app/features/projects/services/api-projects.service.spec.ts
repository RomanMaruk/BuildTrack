import { Test, TestingModule } from '@nestjs/testing';
import { ApiProjectsService } from './api-projects.service';

describe('ApiProjectsService', () => {
  let service: ApiProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProjectsService],
    }).compile();

    service = module.get<ApiProjectsService>(ApiProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
