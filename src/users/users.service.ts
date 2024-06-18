import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

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

  async findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async deleteUser(id: number) {
    if (!this.checkUseExist(id)) {
      throw new Error('User not found!');
    }

    return this.prisma.user.delete({
      where: {
        id,
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

  async checkUseExist(id: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return !!user;
  }
}
