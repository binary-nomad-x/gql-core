import { categories } from './statics';
import { prisma } from '../db';

export async function seedCategories() {
  console.log(`📁 Seeding ${categories.length} Categories...`);

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });


}