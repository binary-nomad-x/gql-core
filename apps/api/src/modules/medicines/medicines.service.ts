import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicineInput } from './dto/create-medicine.input';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.medicine.findMany();
  }

  async findOne(id: number) {
    return this.prisma.medicine.findUnique({ where: { id } });
  }

  async create(data: CreateMedicineInput) {
    return this.prisma.medicine.create({ data });
  }
}
