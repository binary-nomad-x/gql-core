import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { randomUUID } from 'node:crypto';

// Enum ko register karna zaroori hai taake GraphQL schema ko samajh sakay
registerEnumType(Role, {
  name: 'Role',
  description: 'The user roles available in the system',
});

@ObjectType()
export class User {
  @Field(() => randomUUID)
  id!: string; // '!' means that its value is mandatory at run-time

  @Field()
  email!: string;

  @Field({ nullable: true })
  name?: string; // '?' theek hai kyunki ye database mein bhi optional ho sakti hai

  @Field(() => Role)
  role!: Role;

  @Field()
  createdAt!: Date;
}
