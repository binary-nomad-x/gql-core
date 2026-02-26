import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Doctor } from '../../doctors/models/doctor.model';

@ObjectType()
export class Appointment {
    @Field(() => Int)
    id: number;

    @Field()
    date: Date;

    @Field()
    reason: string;

    @Field(() => Int)
    doctorId: number;

    @Field(() => Doctor)
    doctor: Doctor;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
