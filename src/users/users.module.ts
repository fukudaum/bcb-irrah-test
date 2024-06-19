import { Module, Provider } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { UsersRepository } from './repositories/users.repository';

const userRepositoryProvider: Provider = {
  provide: UsersRepository,
  useClass: PrismaUsersRepository,
};

@Module({
  imports: [],
  providers: [UsersService, userRepositoryProvider, PrismaService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
