import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CurrencyCode } from '@build-track/types';

@Entity({ name: 'exchange_rates' })
@Unique('UQ_exchange_rates_code_date', ['currencyCode', 'date'])
export class ExchangeRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CurrencyCode })
  currencyCode: CurrencyCode;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  rate: number;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;
}
