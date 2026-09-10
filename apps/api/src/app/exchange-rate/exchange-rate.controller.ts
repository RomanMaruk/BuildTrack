import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { CurrencyCode } from '@build-track/types';
import { ExchangeRateService } from './exchange-rate.service';

@Controller('exchange-rates')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get(':currencyCode/:date')
  async getRateForDate(
    @Param('currencyCode', new ParseEnumPipe(CurrencyCode)) currencyCode: CurrencyCode,
    @Param('date') dateStr: string,
  ) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return this.exchangeRateService.findRateForDate(currencyCode, date);
  }
}
