import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Appointment } from '../../appointments/models/appointment.model';

@ObjectType()
export class Doctor {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  specialty: string;

  @Field(() => [Appointment], { nullable: 'itemsAndList' })
  appointments?: Appointment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
