import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        email: createUserInput.email,
        passwordHash: createUserInput.password, // Hash it later
        name: createUserInput.name,
      },
    });
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id }, // Prisma UUID string hi expect karta hai
      data: updateUserInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
