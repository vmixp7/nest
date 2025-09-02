import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
