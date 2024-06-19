import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UpdateBalanceDto, UpdateLimitDto, UpdatePlanDto } from './users.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.usersRepository.create(data);

    return {
      ...user,
      password: undefined,
    };
  }

  async findUserById(userId: number): Promise<User | null> {
    return await this.usersRepository.findById(userId);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findByUsername(username);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async deleteUser(userId: number) {
    if (!this.checkUseExist(userId)) {
      throw new Error('User not found!');
    }

    return this.usersRepository.delete(userId);
  }

  async updateUser(
    userId: number,
    params: Prisma.UserUpdateInput,
  ): Promise<User> {
    if (!this.checkUseExist(userId)) {
      throw new Error('User not found!');
    }

    return await this.usersRepository.update(userId, params);
  }

  private async checkUseExist(userId: number): Promise<boolean> {
    const user = await this.usersRepository.findById(userId);

    return !!user;
  }

  async addBalance({ userId, balance }: UpdateBalanceDto): Promise<User> {
    if (!this.checkUseExist(+userId)) {
      throw new Error('User not found!');
    }

    if (!balance) {
      throw new Error('Missing Info!');
    }

    return await this.usersRepository.updateBalance(+userId, +balance);
    // return await this.prisma.user.update({
    //   data: {
    //     balance: {
    //       increment: +balance,
    //     },
    //   },
    //   where: {
    //     id: +userId,
    //   },
    // });
  }

  async getBalance(userId: number): Promise<number> {
    return (await this.usersRepository.findById(userId))?.balance;
  }

  async updateLimit({ userId, limit }: UpdateLimitDto): Promise<User> {
    if (!this.checkUseExist(+userId)) {
      throw new Error('User not found!');
    }

    if (!limit) {
      throw new Error('Missing Info!');
    }

    return await this.usersRepository.updateField(userId, 'maxLimit', +limit);
    // return await this.prisma.user.update({
    //   data: {
    //     maxLimit: +limit,
    //   },
    //   where: {
    //     id: +userId,
    //   },
    // });
  }

  async updatePlan({ userId, plan }: UpdatePlanDto): Promise<User> {
    if (!this.checkUseExist(+userId)) {
      throw new Error('User not found!');
    }

    if (!plan) {
      throw new Error('Missing Info!');
    }

    return await this.usersRepository.updateField(userId, 'planType', plan);

    // return await this.prisma.user.update({
    //   data: {
    //     planType: plan,
    //   },
    //   where: {
    //     id: +userId,
    //   },
    // });
  }

  async getList(): Promise<User[]> {
    return await this.usersRepository.findMany();
  }
}
