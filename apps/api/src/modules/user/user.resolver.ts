import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Create User Mutation
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  // Get All Users Query
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  // Get One User Query
  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  // Update User Mutation
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  // Remove User Mutation
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }
}
