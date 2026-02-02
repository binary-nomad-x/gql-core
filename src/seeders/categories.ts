import { categories } from '../data/categories';
import { prisma } from '../db';

/**
 * Seeds categories from the static data file.
 */
export async function seedCategories() {
  console.log(`📁 Seeding ${categories.length} Categories...`);

  // createMany is efficient for static lists like categories.
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log(`✅ ${categories.length} categories seeded!`);
}