import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
    @Field()
    date: Date;

    @Field()
    reason: string;

    @Field(() => Int)
    doctorId: number;
}
