import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private dbManager: EntityManager;
  constructor(private readonly datasource: DataSource) {
    this.dbManager = datasource.manager;
  }
  async create(payload: CreateUserInput): Promise<User> {
    const { password, username } = payload;

    const existingUser = await this.dbManager.findOne(User, {
      where: { username: username },
    });
    if (existingUser) {
      throw new NotFoundException('User already exist!!');
    }
    const hashPassword = bcrypt.hash(password, 10);
    const newUser = this.dbManager.create(User, {
      ...payload,
      hashPassword,
    });
    const saveUser = this.dbManager.save(newUser);
    return saveUser;
  }
  async findOne(username: string): Promise<User> {
    const user = await this.dbManager.findOne(User, {
      where: { username: username },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const user = await this.dbManager.find(User);
    return user;
  }
}
