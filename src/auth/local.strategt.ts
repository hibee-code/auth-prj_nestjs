import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    const user = this.authService.validateUser(username, password);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
