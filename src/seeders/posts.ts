import { generatePost, randomInt, randomItems, randomItem } from './lib';
import { prisma } from '../db';
import * as cliProgress from 'cli-progress';

const POST_COUNT = 2000;

export async function seedPosts() {
  console.log(`📝 Seeding ${POST_COUNT} Posts...`);

  // 1. Fetch IDs
  const userIds = (await prisma.user.findMany({ select: { id: true } })).map(u => u.id);
  const categoryIds = (await prisma.category.findMany({ select: { id: true } })).map(c => c.id);
  const tagIds = (await prisma.tag.findMany({ select: { id: true } })).map(t => t.id);

  if (userIds.length === 0 || categoryIds.length === 0) {
    console.error("❌ Please seed Users and Categories first!");
    return;
  }

  // 2. Generate Posts data with Progress Bar
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  console.log("Generating post data...");
  bar.start(POST_COUNT, 0);

  const postsData = Array.from({ length: POST_COUNT }).map((_, index) => {
    const authorId = randomItem(userIds);
    bar.update(index + 1);
    return generatePost(authorId, index);
  });
  bar.stop();

  // 3. Bulk Create Posts
  console.log("Inserting posts into database...");
  await prisma.post.createMany({
    data: postsData,
    skipDuplicates: true,
  });

  // 4. Fetch the created post IDs
  const allPosts = await prisma.post.findMany({
    select: { id: true },
    take: POST_COUNT,
    orderBy: { id: 'desc' }
  });
  const allPostIds = allPosts.map(p => p.id);

  // 5. Build Pivot Table Data and Tag Connections
  console.log("🔗 Connecting Posts to Categories and Tags...");
  const pivotBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  pivotBar.start(allPostIds.length, 0);

  const pivotData: { postId: number; categoryId: number }[] = [];

  // For implicit many-to-many (Tags), we usually need to use `update` or `create` with `connect`.
  // However, for speed, we'll avoid individual updates. 
  // TIP: Implicit M-M tables are named like `_PostTags` or similar. 
  // But for this educational project, we'll stick to categories for bulk demo.

  for (let i = 0; i < allPostIds.length; i++) {
    const postId = allPostIds[i]!;
    const count = randomInt(1, 3);
    const selectedCategories = randomItems(categoryIds, count);

    for (const catId of selectedCategories) {
      pivotData.push({ postId, categoryId: catId });
    }
    pivotBar.update(i + 1);
  }
  pivotBar.stop();

  // 6. Bulk Insert into Pivot Table
  await prisma.postCategory.createMany({
    data: pivotData,
    skipDuplicates: true,
  });

  console.log(`✅ ${postsData.length} posts and ${pivotData.length} category relations seeded!`);
}