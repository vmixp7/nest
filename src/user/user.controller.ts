import { HttpException, Controller, Get, Put, Post, Query, Param, Body, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggingInterceptor } from '../common/interceptors/logging';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users | null> {
    return this.userService.findOne(parseInt(id, 10));
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.create(createUserDto);
  }
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
    if (id === "") {
      throw new HttpException('ID is required', 400);
    }
    return this.userService.update(+id, updateUserDto);
  }
}