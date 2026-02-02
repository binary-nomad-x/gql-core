import { categories } from '../data/categories';
import { prisma } from '../db';

/**
 * Seeds categories.
 */
export async function seedCategories() {
  console.log(`📁 Seeding ${categories.length} Categories...`);

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log(`✅ ${categories.length} categories seeded successfully!`);

}