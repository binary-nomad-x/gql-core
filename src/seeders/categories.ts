// src/seeders/categories.ts
import { PrismaClient } from '@prisma/client';
import { categories } from './statics';
import { prisma } from '../db';

export async function seedCategories() {
  console.log(`📁 Seeding ${categories.length} Categories...`);

  // createMany is much faster than looping create()
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });


}