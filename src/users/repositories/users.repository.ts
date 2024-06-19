import { Prisma, User } from '@prisma/client';

export abstract class UsersRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract findById(id: number): Promise<User>;
  abstract findByUsername(username: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract delete(id: number): Promise<User>;
  abstract update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
  abstract findMany(): Promise<User[]>;
  abstract updateField(id: number, field: string, value): Promise<User>;
  abstract updateBalance(id: number, balance: number): Promise<User>;
}
