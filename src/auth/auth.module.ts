import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt-strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    UsersService,
    JwtStrategy,
  ],
})
export class AuthModule {}
