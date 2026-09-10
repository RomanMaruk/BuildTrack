import { IsUUID, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min, IsISO8601, IsString, MaxLength } from 'class-validator';
import { CurrencyCode, ExpenseUnit } from '@build-track/types';

export class CreateExpenseDto {
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsEnum(ExpenseUnit)
  @IsNotEmpty()
  unit: ExpenseUnit;

  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsEnum(CurrencyCode)
  @IsNotEmpty()
  currency: CurrencyCode;

  @IsOptional()
  @IsNumber()
  @Min(0)
  exchangeRate?: number;
}
