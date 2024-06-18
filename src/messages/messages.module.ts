import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  providers: [MessagesService, PrismaService],
  controllers: [MessagesController],
})
export class MessagesModule {}
