import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './models/appointment.model';
import { CreateAppointmentInput } from './dto/create-appointment.input';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentsService.getAllAppointments();
  }

  @Mutation(() => Appointment)
  createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ) {
    return this.appointmentsService.createAppointment(createAppointmentInput);
  }
}
