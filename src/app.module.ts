import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { OrderModule } from './order/order.module';
import { OrderMiddleware } from './order/order.middleware';
import { AdminsMiddleware } from './admins/admins.middleware';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 資料庫主機位址
      port: 3306, // 資料庫 Port
      username: 'root', // 資料庫使用者名稱
      password: '2iuixigi', // 資料庫密碼
      database: 'mydb', // 資料庫名稱
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 實體（Entity）檔案的路徑
      synchronize: true, // 開發環境下可設為 true，會自動同步資料庫結構，正式環境請務必關閉！
      // 連接池參數設定
      extra: {
        connectionLimit: 10, // 連接池最大連線數
        waitForConnections: true, // 當連線數達到上限時是否等待
        queueLimit: 0, // 等待佇列的最大長度 (0 表示無上限)
      },
    }),
    AdminsModule,
    OrderModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
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
