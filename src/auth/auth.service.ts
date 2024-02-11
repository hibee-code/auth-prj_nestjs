import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private dbManager: EntityManager;
  constructor(
    private readonly datasource: DataSource,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {
    this.dbManager = datasource.manager;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const valid = await bcrypt.compare(password, user?.password);
    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
  signin(user: User) {
    return {
      access_Token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const existingUser = this.userService.findOne(loginUserInput.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this.userService.create({ ...loginUserInput, password });
  }
}
