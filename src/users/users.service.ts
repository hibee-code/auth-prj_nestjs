import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
@Injectable()
export class UsersService {
  private dbManager: EntityManager;
  constructor(private readonly datasource: DataSource) {
    this.dbManager = datasource.manager;
  }
  create(payload: CreateUserInput): Promise<User> {
    const { password } = payload;

    const hash = bcrypt.hashSync(password, 10);

    const existingUser = this.dbManager.findOne(User, {
      where: { username: payload.username },
    });
    if (existingUser) {
      throw new NotFoundException('Email already exist!!');
    }
    const newUser = this.dbManager.create(User, {
      ...payload,
      password: hash,
    });
    const saveUser = this.dbManager.save(newUser);
    return saveUser;
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
}
