import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateApiDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
