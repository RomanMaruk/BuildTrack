import { CurrencyCodeType, ICreateProject } from '@build-track/types';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateProjectDto implements ICreateProject {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @Length(3, 3)
  baseCurrency: CurrencyCodeType;
}
