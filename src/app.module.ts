import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PrismaModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
