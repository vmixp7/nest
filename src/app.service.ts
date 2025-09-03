import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
  geUsers(): string {
    return 'This action returns all users';
  }


}
