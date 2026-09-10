import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyCode } from '@build-track/types';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { CategoryService } from '../category/category.service';
import { SupplierService } from '../supplier/supplier.service';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>,
    private readonly categoryService: CategoryService,
    private readonly supplierService: SupplierService,
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  async create(projectId: string, createdById: string, dto: CreateExpenseDto) {
    const expenseDate = new Date(dto.date);

    await this.categoryService.findOne(dto.categoryId, createdById);

    if (dto.supplierId) {
      await this.supplierService.findOne(dto.supplierId, projectId);
    }

    const totalOriginal = Number(dto.quantity) * Number(dto.unitPrice);

    let exchangeRate = dto.exchangeRate ?? 1;

    if (!dto.exchangeRate && dto.currency !== CurrencyCode.USD) {
      try {
        const exRate = await this.exchangeRateService.findRateForDate(dto.currency as CurrencyCode, expenseDate);
        exchangeRate = Number(exRate.rate);
      } catch {
        exchangeRate = 1;
      }
    }

    let totalUsd: number;
    let totalUah: number;

    if (dto.currency === CurrencyCode.USD) {
      totalUsd = totalOriginal;
      try {
        const usdToUahRate = await this.exchangeRateService.findRateForDate(CurrencyCode.USD, expenseDate);
        totalUah = totalUsd * Number(usdToUahRate.rate);
      } catch {
        totalUah = totalUsd * 40;
      }
    } else if (dto.currency === CurrencyCode.UAH) {
      totalUah = totalOriginal;
      try {
        const uahToUsdRate = await this.exchangeRateService.findRateForDate(CurrencyCode.UAH, expenseDate);
        totalUsd = totalUah * Number(uahToUsdRate.rate);
      } catch {
        totalUsd = totalUah / 40;
      }
    } else {
      totalUsd = totalOriginal * exchangeRate;
      try {
        const usdToUahRate = await this.exchangeRateService.findRateForDate(CurrencyCode.USD, expenseDate);
        totalUah = totalUsd * Number(usdToUahRate.rate);
      } catch {
        totalUah = totalUsd * 40;
      }
    }

    return this.expenseRepository.save(
      this.expenseRepository.create({
        projectId,
        createdById,
        ...dto,
        date: expenseDate,
        currency: dto.currency as CurrencyCode,
        exchangeRate,
        totalOriginal,
        totalUah,
        totalUsd,
      }),
    );
  }

  async findAllForProject(projectId: string, filters?: { categoryId?: string; supplierId?: string; dateFrom?: Date; dateTo?: Date }) {
    let query = this.expenseRepository.createQueryBuilder('expense').where('expense.projectId = :projectId', { projectId });

    if (filters?.categoryId) {
      query = query.andWhere('expense.categoryId = :categoryId', { categoryId: filters.categoryId });
    }

    if (filters?.supplierId) {
      query = query.andWhere('expense.supplierId = :supplierId', { supplierId: filters.supplierId });
    }

    if (filters?.dateFrom) {
      query = query.andWhere('expense.date >= :dateFrom', { dateFrom: filters.dateFrom });
    }

    if (filters?.dateTo) {
      query = query.andWhere('expense.date <= :dateTo', { dateTo: filters.dateTo });
    }

    return query.orderBy('expense.date', 'DESC').getMany();
  }

  async findOne(id: string, projectId: string) {
    const expense = await this.expenseRepository.findOne({ where: { id } });

    if (!expense || expense.projectId !== projectId) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }

    return expense;
  }

  async update(id: string, projectId: string, createdById: string, dto: UpdateExpenseDto) {
    const expense = await this.findOne(id, projectId);

    if (expense.createdById !== createdById) {
      throw new ForbiddenException('Only the author or an owner/admin can edit this expense');
    }

    if (dto.projectId || dto.createdById) {
      throw new ForbiddenException('Cannot change projectId or createdById');
    }

    if (dto.categoryId) {
      await this.categoryService.findOne(dto.categoryId, expense.createdById);
    }

    if (dto.supplierId) {
      await this.supplierService.findOne(dto.supplierId, projectId);
    }

    let updateData: any = { ...dto };

    if (dto.date || dto.quantity || dto.unitPrice || dto.currency || dto.exchangeRate) {
      const expenseDate = dto.date ? new Date(dto.date) : expense.date;
      const quantity = dto.quantity ?? expense.quantity;
      const unitPrice = dto.unitPrice ?? expense.unitPrice;
      const currency = (dto.currency as CurrencyCode) ?? expense.currency;
      let exchangeRate = dto.exchangeRate ?? expense.exchangeRate;

      const totalOriginal = Number(quantity) * Number(unitPrice);

      if (!dto.exchangeRate && currency !== CurrencyCode.USD && currency !== expense.currency) {
        try {
          const exRate = await this.exchangeRateService.findRateForDate(currency, expenseDate);
          exchangeRate = Number(exRate.rate);
        } catch {
          exchangeRate = 1;
        }
      }

      let totalUsd: number;
      let totalUah: number;

      if (currency === CurrencyCode.USD) {
        totalUsd = totalOriginal;
        try {
          const usdToUahRate = await this.exchangeRateService.findRateForDate(CurrencyCode.USD, expenseDate);
          totalUah = totalUsd * Number(usdToUahRate.rate);
        } catch {
          totalUah = totalUsd * 40;
        }
      } else if (currency === CurrencyCode.UAH) {
        totalUah = totalOriginal;
        try {
          const uahToUsdRate = await this.exchangeRateService.findRateForDate(CurrencyCode.UAH, expenseDate);
          totalUsd = totalUah * Number(uahToUsdRate.rate);
        } catch {
          totalUsd = totalUah / 40;
        }
      } else {
        totalUsd = totalOriginal * exchangeRate;
        try {
          const usdToUahRate = await this.exchangeRateService.findRateForDate(CurrencyCode.USD, expenseDate);
          totalUah = totalUsd * Number(usdToUahRate.rate);
        } catch {
          totalUah = totalUsd * 40;
        }
      }

      updateData = {
        ...updateData,
        totalOriginal,
        totalUah,
        totalUsd,
        exchangeRate,
      };
    }

    await this.expenseRepository.update(id, updateData);
    return this.findOne(id, projectId);
  }

  async remove(id: string, projectId: string) {
    const expense = await this.findOne(id, projectId);
    await this.expenseRepository.remove(expense);
    return expense;
  }
}
