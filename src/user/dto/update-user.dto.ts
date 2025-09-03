import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType 會讓 CreateUserDto 中的所有屬性變成可選
export class UpdateUserDto extends PartialType(CreateUserDto) { }