import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    return { message: 'Hello API !!!!!' };
  }
}
