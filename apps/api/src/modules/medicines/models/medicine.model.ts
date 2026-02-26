import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Medicine {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;

    @Field(() => Int)
    stock: number;
}
