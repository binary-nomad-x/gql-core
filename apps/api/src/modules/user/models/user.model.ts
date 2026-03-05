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
  id!: string; // '!' ka matlab hai ke ye property runtime par zaroor hogi

  @Field()
  email!: string;

  @Field({ nullable: true })
  name?: string; // '?' theek hai kyunki ye database mein bhi optional ho sakti hai

  @Field(() => Role)
  role!: Role;

  @Field()
  createdAt!: Date;
}
