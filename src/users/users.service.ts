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
    const { password } = payload;

    const hash = await bcrypt.hash(password, 10);

    const existingUser = await this.dbManager.findOne(User, {
      where: { username: payload.username },
    });
    if (existingUser) {
      throw new NotFoundException('User already exist!!');
    }
    const newUser = this.dbManager.create(User, {
      ...payload,
      password: hash,
    });
    const savedUser = await this.dbManager.save(newUser);
    return savedUser;
  }
  findOne(username: string): Promise<User> {
    const user = this.dbManager.findOne(User, { where: { username } });
    return user;
  }

  findAll(): Promise<User[]> {
    const user = this.dbManager.find(User);
    return user;
  }
}
