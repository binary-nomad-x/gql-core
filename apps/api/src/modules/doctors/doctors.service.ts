import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorInput } from './dto/create-doctor.input';

@Injectable()
export class DoctorsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.doctor.findMany({
            include: { appointments: true },
        });
    }

    async findOne(id: number) {
        return this.prisma.doctor.findUnique({
            where: { id },
            include: { appointments: true },
        });
    }

    async create(data: CreateDoctorInput) {
        return this.prisma.doctor.create({ data });
    }
}
