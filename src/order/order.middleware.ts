import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class OrderMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('OrderMiddleware is running');
    next();
  }
}
