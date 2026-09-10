import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  constructor(@InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>) {}

  async create(projectId: string, dto: CreateSupplierDto) {
    return this.supplierRepository.save(this.supplierRepository.create({ ...dto, projectId }));
  }

  async findAllForProject(projectId: string) {
    return this.supplierRepository.find({ where: { projectId }, order: { name: 'ASC' } });
  }

  async findOne(id: string, projectId: string) {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier || supplier.projectId !== projectId) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, projectId: string, dto: UpdateSupplierDto) {
    await this.findOne(id, projectId);
    await this.supplierRepository.update(id, dto);
    return this.findOne(id, projectId);
  }

  async remove(id: string, projectId: string) {
    const supplier = await this.findOne(id, projectId);
    await this.supplierRepository.remove(supplier);
    return supplier;
  }
}
