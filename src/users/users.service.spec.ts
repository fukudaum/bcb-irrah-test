import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { InMemoryUsersRepository } from './repositories/in-memory-users.repository';
import { Provider } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { Prisma } from '@prisma/client';

const userData: Prisma.UserCreateInput = {
  cnpj: '1234565',
  companyName: 'Grupo Irrah',
  cpf: '1354687498',
  email: 'teste@gmail.com',
  password: '123456',
  phone: '554499999999',
  username: 'UserTest',
  balance: 40,
  planType: 'PRE_PAID',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const userRepositoryProvider: Provider = {
      provide: UsersRepository,
      useClass: InMemoryUsersRepository,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create an user', async () => {
    const user = await service.createUser(userData);

    expect(user).toHaveProperty('id');

    delete userData.password;
    delete user.password;
    delete user.id;

    expect(user).toMatchObject(userData);
  });

  it('should find a user by id', async () => {
    const user = await service.createUser(userData);

    const foundUser = await service.findUserById(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(user.id);
  });

  it('should update user balance', async () => {
    const user = await service.createUser(userData);

    const updatedUser = await service.addBalance({
      userId: user.id,
      balance: 50,
    });
    expect(updatedUser.balance).toBe(90);
  });

  it('should throw an error if user not found when updating balance', async () => {
    await expect(
      service.addBalance({ userId: 999, balance: 50 }),
    ).rejects.toThrow('User not found!');
  });

  it('should throw an error if balance is missing', async () => {
    const user = await service.createUser(userData);

    await expect(
      service.addBalance({ userId: user.id, balance: null }),
    ).rejects.toThrow('Missing Info!');
  });

  it('should throw an error if user not found when deleting', async () => {
    await expect(service.deleteUser(999)).rejects.toThrow('User not found!');
  });

  it('should delete a user', async () => {
    const user = await service.createUser(userData);

    await service.deleteUser(user.id);
    const foundUser = await service.findUserById(user.id);
    expect(foundUser).toBeNull();
  });

  it('should throw an error if user not found when updating limit', async () => {
    await expect(
      service.updateLimit({ userId: 999, limit: 100 }),
    ).rejects.toThrow('User not found!');
  });

  it('should throw an error if limit is missing', async () => {
    const user = await service.createUser(userData);

    await expect(
      service.updateLimit({ userId: user.id, limit: null }),
    ).rejects.toThrow('Missing Info!');
  });

  it('should update user limit', async () => {
    const user = await service.createUser(userData);

    const updatedUser = await service.updateLimit({
      userId: user.id,
      limit: 100,
    });
    expect(updatedUser.maxLimit).toBe(100);
  });

  it('should throw an error if user not found when updating plan', async () => {
    await expect(
      service.updatePlan({ userId: 999, plan: 'POST_PAID' }),
    ).rejects.toThrow('User not found!');
  });

  it('should throw an error if plan is missing', async () => {
    const user = await service.createUser(userData);

    await expect(
      service.updatePlan({ userId: user.id, plan: null }),
    ).rejects.toThrow('Missing Info!');
  });

  it('should update user plan', async () => {
    const user = await service.createUser(userData);

    const updatedUser = await service.updatePlan({
      userId: user.id,
      plan: 'POST_PAID',
    });
    expect(updatedUser.planType).toBe('POST_PAID');
  });

  it('should get a list of users', async () => {
    await service.createUser(userData);

    await service.createUser({
      cnpj: '2234565',
      companyName: 'Grupo Irrah',
      cpf: '2354687498',
      email: 'teste2@gmail.com',
      password: '223456',
      phone: '554488888888',
      username: 'UserTest2',
      maxLimit: 100,
      planType: 'POST_PAID',
    });

    const users = await service.getList();
    expect(users).toHaveLength(2);
    expect(users[0].email).toBe('teste@gmail.com');
    expect(users[1].email).toBe('teste2@gmail.com');
  });

  it('should throw an error if user not found when updating user', async () => {
    await expect(
      service.updateUser(999, { email: 'newTeste@gmail.com' }),
    ).rejects.toThrow('User not found!');
  });

  it('should update a user', async () => {
    const user = await service.createUser(userData);

    const updatedUser = await service.updateUser(user.id, {
      email: 'newTeste@gmail.com',
    });
    expect(updatedUser.email).toBe('newTeste@gmail.com');
  });

  it('should check if a user exists', async () => {
    const user = await service.createUser(userData);

    const exists = await service['checkUseExist'](user.id);
    expect(exists).toBe(true);
  });

  it('should return false if user does not exist', async () => {
    const exists = await service;
    expect(exists).toBe(false);
  });
});
