import { Injectable } from '@nestjs/common';
// import { User } from '../users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login.response';

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

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    const passwordvalid = await bcrypt.compare(password, user.password);
    if (user && passwordvalid) {
      const { ...result } = user;
      return result;
    }
  }

  // signin(user: User) {
  //   return {
  //     access_Token: this.jwtService.sign({
  //       username: user.username,
  //       sub: user.id,
  //     }),
  //     user,
  //   };
  // }

  async signin(
    username: string,
    password: string,
  ): Promise<LoginResponse | null> {
    const user = await this.validateUser(username, password);
    if (user) {
      const accessToken = this.jwtService.sign({
        username: user.username,
        sub: user.id,
      });
      return { access_token: accessToken, user };
    }
    return null;
  }

  async signup(loginUserInput: LoginUserInput) {
    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this.userService.create({ ...loginUserInput, password });
  }
}
