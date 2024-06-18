import { PlanType } from '@prisma/client';

export class UpdatePlanDto {
  plan: PlanType;
  userId: number;
}

export class UpdateLimitDto {
  limit: number;
  userId: number;
}

export class UpdateBalanceDto {
  balance: number;
  userId: number;
}
