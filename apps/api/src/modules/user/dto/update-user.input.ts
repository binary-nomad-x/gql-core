import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID) // GraphQL ko batayein ke ye ID type hai
  id!: string; // number ko string karein aur ! lagayein
}
