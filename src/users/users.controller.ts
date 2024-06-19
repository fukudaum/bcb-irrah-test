import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { UpdateBalanceDto, UpdateLimitDto, UpdatePlanDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number) {
    try {
      return await this.usersService.deleteUser(+userId);
    } catch (error) {
      console.error(error);
    }
  }

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

  @Post()
  async createUser(@Body() params: any): Promise<User> {
    try {
      return await this.usersService.createUser(params);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: number) {
    try {
      return await this.usersService.findUserById(+userId);
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  async getUsers(): Promise<User[]> {
    try {
      return await this.usersService.getList();
    } catch (error) {
      console.error(error);
    }
  }

  @Patch('/backoffice/plan/')
  async updatePlan(@Body() params: UpdatePlanDto) {
    try {
      return await this.usersService.updatePlan(params);
    } catch (error) {
      console.error(error);
    }
  }

  @Patch('/backoffice/limit/')
  async updateLimit(@Body() params: UpdateLimitDto) {
    try {
      console.log(params);
      return await this.usersService.updateLimit(params);
    } catch (error) {
      console.error(error);
    }
  }

  @Patch('/backoffice/balance/')
  async updateBalance(@Body() params: UpdateBalanceDto) {
    try {
      return await this.usersService.addBalance(params);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/backoffice/balance/:userId')
  async getBalance(@Param('userId') userId: number) {
    try {
      return await this.usersService.getBalance(+userId);
    } catch (error) {
      console.error(error);
    }
  }
}
