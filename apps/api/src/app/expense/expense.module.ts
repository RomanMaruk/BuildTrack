import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';
import { CategoryModule } from '../category/category.module';
import { SupplierModule } from '../supplier/supplier.module';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { ProjectMember } from '../project/entities/project-member.entity';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, ProjectMember]),
    CategoryModule,
    SupplierModule,
    ExchangeRateModule,
    ProjectModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
