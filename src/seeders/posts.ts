import { generatePost, randomInt, randomItems, randomItem } from './lib';
import { prisma } from '../db';

const POST_COUNT = 2000;

/**
 * Seeds posts and connects them to random categories.
 * 
 * Performance Tip: 
 * 1. Use createMany for bulk insertions.
 * 2. Avoid complex logic (like sorting large arrays) inside loops.
 */
export async function seedPosts() {
  console.log(`📝 Seeding ${POST_COUNT} Posts...`);

  // 1. Fetch existing User & Category IDs
  const userIds = (await prisma.user.findMany({ select: { id: true } })).map(u => u.id);
  const categoryIds = (await prisma.category.findMany({ select: { id: true } })).map(c => c.id);

  if (userIds.length === 0 || categoryIds.length === 0) {
    console.error("❌ Please seed Users and Categories first!");
    return;
  }

  // 2. Generate Posts data
  const postsData = Array.from({ length: POST_COUNT }).map((_, index) => {
    // Pick a random author from existing users
    const authorId = randomItem(userIds);
    return generatePost(authorId, index);
  });

  // 3. Bulk Create Posts
  await prisma.post.createMany({
    data: postsData,
    skipDuplicates: true,
  });

  // 4. Fetch the created post IDs
  // We fetch recently created posts to link them to categories
  const allPosts = await prisma.post.findMany({
    select: { id: true },
    take: POST_COUNT,
    orderBy: { id: 'desc' }
  });
  const allPostIds = allPosts.map(p => p.id);

  console.log("🔗 Connecting Posts to Categories in bulk...");

  // 5. Build Pivot Table Data
  const pivotData: { postId: number; categoryId: number }[] = [];

  for (const postId of allPostIds) {
    // Each post gets 1 to 3 random categories
    const count = randomInt(1, 3);
    const selectedCategories = randomItems(categoryIds, count);

    for (const catId of selectedCategories) {
      pivotData.push({
        postId: postId,      // Field name must match Prisma model
        categoryId: catId    // Field name must match Prisma model
      });
    }
  }

  // 6. Bulk Insert into Pivot Table
  await prisma.postCategory.createMany({
    data: pivotData,
    skipDuplicates: true,
  });

  console.log(`✅ ${postsData.length} posts and ${pivotData.length} post-category relations added!`);
}