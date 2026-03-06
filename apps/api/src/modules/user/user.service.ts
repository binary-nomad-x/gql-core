import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { hashPassword } from '@util/helpers';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    // 1. Password hash karein
    const hashedPassword = await hashPassword(createUserInput.password);

    // 2. Database mein save karein
    return this.prisma.user.create({
      data: {
        email: createUserInput.email,
        name: createUserInput.name,
        passwordHash: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
