import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'; // ID import karein
import { Role } from '@prisma/client';
import { Gender } from './gender.model';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class User {
  @Field(() => ID) // Yahan ID hona chahiye, randomUUID nahi
  id!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Role)
  role!: Role;

  @Field({ nullable: true })
  gender?: Gender;

  @Field()
  createdAt!: Date;
}
