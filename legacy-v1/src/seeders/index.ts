import { prisma } from '../db';
import { performance } from 'perf_hooks';
import { seedCategories } from './categories';
import { seedUsers } from './users';
import { seedPosts } from './posts';
import { seedComments } from './comments';
import { seedNewsletters } from './newsletters';
import { seedProducts } from './products';
import { seedTags } from './tags';
import { truncateTables } from '../helpers/shared';

/**
 * Main seed coordinator.
 * Orchestrates the seeding process in the correct order to maintain referential integrity.
 */
async function main() {
  const start = performance.now();
  console.log('🚀 [COORDINATOR] Starting Professional Data Injection...');

  try {
    // 1. CLEANUP
    console.log('\n🧹 Step 0: Clearing existing data...');
    await truncateTables();

    // 2. INDEPENDENT TABLES
    console.log(
      '\n🏗️ Step 1: Seeding Independent Tables (Categories, Tags, Newsletters, Products)...'
    );
    await seedCategories();
    await seedTags();
    await seedNewsletters();
    await seedProducts();

    // 3. CORE TABLES (Users)
    console.log('\n👥 Step 2: Seeding Core Tables (Users & Profiles)...');
    await seedUsers();

    // 4. DEPENDENT TABLES (Posts)
    console.log('\n⚡ Step 3: Seeding Relational Tables (Posts)...');
    await seedPosts();

    // 5. CHILD TABLES (Comments)
    console.log('\n💬 Step 4: Seeding Interaction Tables (Comments)...');
    await seedComments();

    const end = performance.now();
    const duration = ((end - start) / 1000).toFixed(2);

    console.log(`
      ✅ ==========================================
      ✅ SEEDING COMPLETE
      ⏱️  Total Time: ${duration}s
      📊 Summary:
         - Categories: Handled
         - Tags: Handled
         - Newsletters: Handled
         - Products: Handled
         - Users/Profiles: Handled
         - Posts/Pivot: Handled
         - Comments: Handled
      ✅ ==========================================
    `);
  } catch (error) {
    console.error('❌ CRITICAL SEED ERROR:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Unexpected Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
