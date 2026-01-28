// src/seeders/categories.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Technology', short_description: 'Tech, coding, and hardware' },
  { name: 'Lifestyle', short_description: 'Daily life and wellness' },
  { name: 'Education', short_description: 'Tutorials and learning' },
  { name: 'Business', short_description: 'Corporate and startup news' },
  { name: 'Health', short_description: 'Medical and fitness advice' },
  { name: 'Science', short_description: 'Scientific discoveries' },
  { name: 'Art', short_description: 'Design and creativity' },
  { name: 'Travel', short_description: 'Adventure and exploration' },
];

export async function seedCategories() {
  console.log(`📁 Seeding ${categories.length} Categories...`);
  
  // createMany is much faster than looping create()
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });
}