import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CurrencyCode, ExpenseUnit } from '@build-track/types';
import { Project } from '../../project/entities/project.entity';
import { Category } from '../../category/entities/category.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'expenses' })
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @ManyToOne(() => Supplier, { nullable: true })
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier | null;

  @Column({ nullable: true })
  supplierId: string | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'enum', enum: ExpenseUnit })
  unit: ExpenseUnit;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'enum', enum: CurrencyCode })
  currency: CurrencyCode;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  exchangeRate: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalOriginal: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalUah: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalUsd: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

