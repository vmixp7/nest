import { Controller,Get,Post,Query,Body} from '@nestjs/common';
import { AppService } from '../app.service';
class CreateUserDto {
    name: string;
    age: number;
    email: string;
  }
@Controller('user')
export class UserController {
    constructor(private readonly appService: AppService) {}
    @Get()
    findAll(@Query  () param : any): string {
      return this.appService.geUsers();
    }
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      // 现在 createUserDto 是类型安全的
      return createUserDto;
    }
}