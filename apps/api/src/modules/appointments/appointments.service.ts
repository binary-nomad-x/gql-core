import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async getAllAppointments() {
    return this.prisma.appointment.findMany({
      include: { doctor: true },
    });
  }

  async createAppointment(data: CreateAppointmentInput) {
    return this.prisma.appointment.create({
      data: {
        date: data.date,
        reason: data.reason,
        doctorId: data.doctorId,
      },
    });
  }
}
