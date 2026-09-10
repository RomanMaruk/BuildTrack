import { IsNotEmpty, IsOptional, IsString, IsUUID, ArrayUnique } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toLowerCase())
  name: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
