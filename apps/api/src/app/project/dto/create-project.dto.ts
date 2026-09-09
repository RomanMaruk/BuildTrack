import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @Length(3, 3)
  baseCurrency: string;
}
