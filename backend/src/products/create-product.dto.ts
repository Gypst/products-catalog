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

  @IsOptional()
  @IsNumber()
  discountedPrice?: number;

  @IsString()
  sku: string;
}
