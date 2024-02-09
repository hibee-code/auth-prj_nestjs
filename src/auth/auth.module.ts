import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PassportModule, UsersService],
  providers: [AuthService, AuthResolver, LocalStrategy],
})
export class AuthModule {}
