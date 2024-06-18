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

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number) {
    try {
      return await this.usersService.deleteUser(+userId);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:userId')
  async updateUser(
    @Body() params: Prisma.UserUpdateInput,
    @Param('userId') userId: number,
  ): Promise<User> {
    try {
      return await this.usersService.updateUser(+userId, params);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() params: any): Promise<User> {
    try {
      return await this.usersService.createUser(params);
    } catch (error) {
      console.error(error);
    }
  }
}
