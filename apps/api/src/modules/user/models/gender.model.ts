import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class Gender {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}
