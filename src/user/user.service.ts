import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const newUser = this.usersRepository.create(createUserDto); // 建立一個新的 User 實體
    return this.usersRepository.save(newUser); // 將新的 User 儲存到資料庫
  }

  async findAll(): Promise<Users[]> {
    const users = await this.usersRepository.find();
    const data = users.filter(user => user.username === "p7"); // 刪除密碼欄位
    return data;
  }

  async findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    // 步驟 1: 檢查使用者是否存在
    const user = await this.findOne(id);

    // 步驟 2: 合併新資料，Object.assign() 會將 updateUserDto 的屬性複製到 user 物件
    const updatedUser = Object.assign(user, updateUserDto);

    // 步驟 3: 儲存更新後的物件
    return this.usersRepository.save(updatedUser);
  }

}
