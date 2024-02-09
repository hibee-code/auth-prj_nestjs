import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
//import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('payload') payload: CreateUserInput) {
    return this.usersService.create(payload);
  }

  // @Query(() => [User])
  // users(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }
}
