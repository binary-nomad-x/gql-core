// src/seeders/index.ts
import { PrismaClient } from '@prisma/client';
import { performance } from 'perf_hooks';
import { seedCategories } from './categories';
import { seedUsers } from './users';
import { seedPosts } from './posts';
import { seedComments } from './comments';
import { seedNewsletters } from './newsletters';

const prisma = new PrismaClient();

async function main() {
  const start = performance.now();
  console.log('🚀 [IGNITION] Starting Blazing Fast Seed...');

  // 1. Wipe DB in Parallel (Order doesn't matter for deletion)
  // Order matters for deletion due to Foreign Keys!
  console.log('🧹 Clearing Database...');
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
    prisma.newsletter.deleteMany(),
  ]);

  // 2. Seed Independent Table (Categories)
  await seedCategories();

  // 3. Seed Users (which seeds Profiles)
  await seedUsers();

  // 4. Seed Dependent Tables (Posts, Comments, Newsletters) in Parallel
  // We wait for Users to exist first
  await Promise.all([
    seedPosts(),
    seedComments(),
    seedNewsletters(),
  ]);

  const end = performance.now();
  const duration = ((end - start) / 1000).toFixed(2);

  console.log(`
✅ ==========================================
✅ Database Seeded Successfully!
⏱️  Time taken: ${duration}s
✅ ==========================================
`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });