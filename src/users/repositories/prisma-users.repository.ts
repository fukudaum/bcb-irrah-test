import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async delete(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async findMany(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async updateField(id: number, field: string, value): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        [field]: value,
      },
    });
  }

  async updateBalance(id: number, balance: number): Promise<User> {
    return await this.prisma.user.update({
      data: {
        balance: {
          increment: balance,
        },
      },
      where: {
        id,
      },
    });
  }
}
