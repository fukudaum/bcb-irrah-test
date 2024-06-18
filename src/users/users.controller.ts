import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBalanceDto, UpdateLimitDto, UpdatePlanDto } from './users.dto';

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

  @Post()
  async createUser(@Body() params: any): Promise<User> {
    try {
      return await this.usersService.createUser(params);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async getUser(@Param('userId') userId: number) {
    try {
      return await this.usersService.findUserById(userId);
    } catch (error) {
      console.error(error);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/backoffice/plan/:plan/:userId')
  async updatePlan(@Param() params: UpdatePlanDto) {
    try {
      return await this.usersService.updatePlan(params);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/backoffice/limit/:limit/:userId')
  async updateLimit(@Param() params: UpdateLimitDto) {
    try {
      return await this.usersService.updateLimit(params);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/backoffice/balance/:balance/:userId')
  async updateBalance(@Param() params: UpdateBalanceDto) {
    try {
      return await this.usersService.addBalance(params);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/backoffice/balance/:userId')
  async getBalance(@Param('useId') userId: number) {
    try {
      return await this.usersService.getBalance(+userId);
    } catch (error) {
      console.error(error);
    }
  }
}
