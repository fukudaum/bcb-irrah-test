import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(
    userId: number,
    { isWhatsApp, phone, text }: Prisma.MessageCreateInput,
  ) {
    if (!this.verifyUser(userId)) {
      return false;
    }

    await this.prisma.message.create({
      data: {
        isWhatsApp,
        phone,
        text,
        userId,
      },
    });

    console.log(`From: ${userId}, To: ${phone}
      Message: ${text}  
    `);
  }

  async verifyUser(userId: number): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        balance: true,
        maxLimit: true,
        planType: true,
        messageSent: true,
        id: true,
      },
    });

    let canSend = false;
    if (user.planType === 'PRE_PAID') {
      canSend = await this.withdrawl(user);
    }

    if (user.planType === 'POST_PAID') {
      canSend = await this.addToLimit(user);
    }

    return canSend;
  }

  async withdrawl({ id, balance }: Partial<User>) {
    const total = balance - 0.25;
    const canSend = total >= 0;

    if (canSend) {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          balance: total,
        },
      });
    }

    return canSend;
  }

  async addToLimit({ id, messageSent, maxLimit }: Partial<User>) {
    const canSend = messageSent <= maxLimit;

    if (canSend) {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          messageSent: messageSent + 1,
        },
      });
    }

    return canSend;
  }
}
