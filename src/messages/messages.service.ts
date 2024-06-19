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
    const { isValid, userPhone } = await this.verifyUser(userId);

    if (!isValid) {
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

    this.mockMessageSender(userPhone, phone, text);

    return true;
  }

  mockMessageSender(userPhone: string, phone: string, text: string) {
    console.log(`From: ${userPhone}, To: ${phone}
      Message: ${text}  
    `);
  }

  async verifyUser(
    userId: number,
  ): Promise<{ isValid: boolean; userPhone: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        balance: true,
        maxLimit: true,
        planType: true,
        messageSent: true,
        id: true,
        phone: true,
      },
    });

    let canSend = false;
    if (user.planType === 'PRE_PAID') {
      canSend = await this.withdrawl(user);
    }

    if (user.planType === 'POST_PAID') {
      canSend = await this.addToLimit(user);
    }

    return { isValid: canSend, userPhone: user.phone };
  }

  async withdrawl({ id, balance }: Partial<User>): Promise<boolean> {
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

  async addToLimit({
    id,
    messageSent,
    maxLimit,
  }: Partial<User>): Promise<boolean> {
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
