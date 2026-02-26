import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateMedicineInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;
}
