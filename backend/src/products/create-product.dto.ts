import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
  
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @Transform(({ value }) => (value === '' || value === undefined ? null : parseFloat(value)))
  @IsOptional()
  @IsNumber()
  discountedPrice?: number | null;

  @IsString()
  sku: string;
}
