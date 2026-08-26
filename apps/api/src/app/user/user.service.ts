import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }

  async findAll() {
    const users = await this.userRepository.find();
    console.log('Users:', users);
    return users;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
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
