import { IUserData } from '@build-track/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<IUserData> {
    try {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: passwordHash,
      });

      return this.userRepository.save(user);
    } catch (error) {
      console.log('Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto as Partial<User>);
    return this.findOne(id);
  }

  async findByProperty(body: { [key: string]: string }) {
    const obj: { [key: string]: string } = {};
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        obj[key] = body[key];
      }
    }

    const user = await this.userRepository.find({ where: { ...obj } });
    console.log('findByProperty result:', user);
    if (!user || user.length === 0) {
      throw new Error(`No users found with properties: ${JSON.stringify(obj)}`);
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.userRepository.remove(user);
    return user;
  }
}
