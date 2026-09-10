export interface ICreateExchangeRate {
  currencyCode: string;
  rate: number;
  date: Date;
}

export interface IExchangeRateData extends ICreateExchangeRate {
  id: string;
  createdAt: Date;
}
