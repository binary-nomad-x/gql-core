import { prisma } from '../db'; // Aapka shared instance of prisma that should be needed everywhere to query the db
import { performance } from 'perf_hooks';
import { seedCategories } from './categories';
import { seedUsers } from './users';
import { seedPosts } from './posts';
import { seedComments } from './comments';
import { seedNewsletters } from './newsletters';

async function main() {
  const start = performance.now();
  console.log('🚀 [IGNITION] Starting Blazing Fast Seed...');

  try {
    // 1. Wipe DB in strict order (Child tables first, then Parent tables)
    console.log('Sweep 🧹: Clearing existing data...');
    await prisma.$transaction([
      prisma.comment.deleteMany(),
      prisma.post.deleteMany(),
      prisma.profile.deleteMany(),
      prisma.user.deleteMany(),        // User baad mein kyunke Profile/Post is par depend karte hain
      prisma.category.deleteMany(),
      prisma.newsletter.deleteMany(),
    ]);

    // 2. Seed Independent Data
    console.log('Phase 1 🏗️: Seeding Categories...');
    await seedCategories();

    // 3. Seed Core Data (Users + Profiles)
    console.log('Phase 2 👥: Seeding Users and Profiles...');
    await seedUsers();

    // 4. Seed Relational Data in Parallel for Speed
    console.log('Phase 3 ⚡: Seeding Posts, Comments, and Newsletters...');
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
  } catch (error) {
    console.error('❌ Critical Seeding Error:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Unexpected Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Shared instance ko end par disconnect karna zaroori hai
    await prisma.$disconnect();
  });