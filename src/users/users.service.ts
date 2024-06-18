import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UpdateBalanceDto, UpdateLimitDto, UpdatePlanDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = { ...data, password: hashedPassword };
    const user = await this.prisma.user.create({
      data: userData,
    });
    delete user.password;
    return user;
  }

  async findUserById(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user.password;

    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    delete user.password;
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    delete user.password;
    return user;
  }

  async deleteUser(userId: number) {
    if (!this.checkUseExist(userId)) {
      throw new Error('User not found!');
    }

    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(
    userId: number,
    params: Prisma.UserUpdateInput,
  ): Promise<User> {
    if (!this.checkUseExist(userId)) {
      throw new Error('User not found!');
    }

    return await this.prisma.user.update({
      data: params,
      where: {
        id: userId,
      },
    });
  }

  async checkUseExist(userId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    return !!user;
  }

  async addBalance({ userId, balance }: UpdateBalanceDto): Promise<User> {
    if (!this.checkUseExist(userId)) {
      throw new Error('User not found!');
    }

    return await this.prisma.user.update({
      data: {
        balance: {
          increment: balance,
        },
      },
      where: {
        id: userId,
      },
    });
  }

  async getBalance(userId: number): Promise<number> {
    return (
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          balance: true,
        },
      })
    )?.balance;
  }

  async updateLimit({ userId, limit }: UpdateLimitDto): Promise<User> {
    if (!this.checkUseExist(userId)) {
      throw new Error('User not found!');
    }

    return await this.prisma.user.update({
      data: {
        maxLimit: limit,
      },
      where: {
        id: userId,
      },
    });
  }

  async updatePlan({ userId, plan }: UpdatePlanDto): Promise<User> {
    if (!this.checkUseExist(userId)) {
      throw new Error('User not found!');
    }

    return await this.prisma.user.update({
      data: {
        planType: plan,
      },
      where: {
        id: userId,
      },
    });
  }
}
