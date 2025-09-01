import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [AdminsModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
