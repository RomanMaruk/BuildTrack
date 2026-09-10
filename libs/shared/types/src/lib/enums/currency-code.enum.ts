export enum CurrencyCode {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR',
}

export const CURRENCY_CODES = Object.values(CurrencyCode);

export type CurrencyCodeType = keyof typeof CurrencyCode;
