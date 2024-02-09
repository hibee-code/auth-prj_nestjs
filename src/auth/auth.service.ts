import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
  private dbManager: EntityManager;
  constructor(private readonly datasource: DataSource) {
    this.dbManager = datasource.manager;
  }

  validateUser(username: string, password: string): Promise<any> {
    const user = this.dbManager.findOne(User, {
      where: { username: username, password: password },
    });

    if (!user && password) {
      return user;
    }
    return null;
  }
}
