import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { PlanType, Prisma, User } from '@prisma/client';
import * as moment from 'moment';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];
  private idCounter = 1;

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      ...data,
      id: this.idCounter++,
      planType: data.planType || 'PRE_PAID',
      balance: data.balance || 0,
      maxLimit: data.maxLimit || 0,
      messageSent: data.messageSent || 0,
      createdAt: moment().toDate(),
      updatedAt: moment().toDate(),
    };
    this.users.push(user);

    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email) || null;
  }

  async delete(id: number): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found!');
    }

    const user = this.users[index];
    this.users.splice(index, 1);
    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const userIndex = this.users.findIndex((user) => {
      return user.id === id;
    });
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const user = this.users[userIndex];

    const updatedUser: User = {
      id: +id,
      email: (data.email as string) ?? user.email,
      balance: (data.balance as number) ?? user.balance,
      cnpj: (data.cnpj as string) ?? user.cnpj,
      companyName: (data.companyName as string) ?? user.companyName,
      cpf: (data.cpf as string) ?? user.cpf,
      maxLimit: (data.maxLimit as number) ?? user.maxLimit,
      messageSent: (data.messageSent as number) ?? user.messageSent,
      password: (data.password as string) ?? user.password,
      phone: (data.phone as string) ?? user.phone,
      planType: (data.email as PlanType) ?? user.planType,
      username: (data.username as string) ?? user.username,
      updatedAt: moment().toDate(),
      createdAt: user.createdAt,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async updateField(id: number, field: string, value): Promise<User> {
    const userIndex = this.users.findIndex((user) => {
      return user.id === id;
    });

    if (userIndex === -1) {
      throw new Error('User not found!');
    }

    this.users[userIndex][field] = value;

    return this.users[userIndex];
  }

  async updateBalance(id: number, balance: number): Promise<User> {
    const userIndex = this.users.findIndex((user) => {
      return user.id === id;
    });

    if (userIndex === -1) {
      throw new Error('User not found!');
    }

    this.users[userIndex].balance += balance;
    return this.users[userIndex];
  }
}
