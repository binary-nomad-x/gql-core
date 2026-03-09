import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  genderId?: string;

  @Field(() => Role, { defaultValue: Role.MEMBER })
  role?: Role;
}
