import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AdminsModule } from './admins/admins.module';
import { OrderModule } from './order/order.module';
import { OrderMiddleware } from './order/order.middleware';
import { AdminsMiddleware } from './admins/admins.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminsModule, OrderModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OrderMiddleware)
      .forRoutes('order');
    consumer
      .apply(AdminsMiddleware)
      .forRoutes('admins');
  }
}
