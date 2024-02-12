import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginUserInput } from './dto/login-user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/gql-authguard';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginResponse | null> {
    const { username, password } = loginUserInput;
    return this.authService.signin(username, password);
  }

  @Mutation(() => User)
  signUp(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signup(loginUserInput);
  }
}
