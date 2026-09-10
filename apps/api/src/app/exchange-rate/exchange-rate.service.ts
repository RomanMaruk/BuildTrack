import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { CurrencyCode, ICreateExchangeRate } from '@build-track/types';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
  constructor(@InjectRepository(ExchangeRate) private readonly exchangeRateRepository: Repository<ExchangeRate>) {}

  async create(dto: ICreateExchangeRate) {
    return this.exchangeRateRepository.save(
      this.exchangeRateRepository.create({
        ...dto,
        currencyCode: dto.currencyCode as CurrencyCode,
      }),
    );
  }

  async findRateForDate(currencyCode: CurrencyCode, date: Date) {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const rate = await this.exchangeRateRepository.findOne({
      where: {
        currencyCode,
        date: LessThanOrEqual(normalizedDate),
      },
      order: { date: 'DESC' },
    });

    if (!rate) {
      throw new NotFoundException(`Exchange rate for ${currencyCode} on or before ${date} not found`);
    }

    return rate;
  }

  async findOrCreate(currencyCode: CurrencyCode, date: Date, fallbackRate: number) {
    try {
      return await this.findRateForDate(currencyCode, date);
    } catch {
      return { rate: fallbackRate };
    }
  }
}
