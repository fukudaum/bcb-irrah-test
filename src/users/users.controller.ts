import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() params: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.usersService.createUser(params);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Param() userId: number) {
    try {
      return await this.usersService.deleteUser(userId);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(
    @Body() params: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    try {
      return await this.usersService.updateUser(params);
    } catch (error) {
      console.error(error);
    }
  }
}