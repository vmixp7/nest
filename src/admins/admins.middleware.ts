import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('AdminsMiddleware is running');
    next();
  }
}
