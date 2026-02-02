import { randomInt, randomItem, loremText } from './lib';
import { prisma } from '../db';

const COMMENT_COUNT = 3000;

/**
 * Seeds comments for random posts by random users.
 */
export async function seedComments() {
  console.log(`💬 Seeding ${COMMENT_COUNT} Comments...`);

  // 1. Fetch existing User and Post IDs
  const userIds = (await prisma.user.findMany({ select: { id: true } })).map(u => u.id);
  const postIds = (await prisma.post.findMany({ select: { id: true } })).map(p => p.id);

  if (userIds.length === 0 || postIds.length === 0) {
    console.error('❌ No users or posts found! Seed users and posts first.');
    return;
  }

  console.log(`📊 Picking from ${userIds.length} users and ${postIds.length} posts...`);

  // 2. Generate Comment Data
  const comments = Array.from({ length: COMMENT_COUNT }).map(() => ({
    authorId: randomItem(userIds),
    postId: randomItem(postIds),
    text: randomItem(loremText)
  }));

  // 3. Bulk Insert
  try {
    const result = await prisma.comment.createMany({
      data: comments,
      skipDuplicates: true,
    });

    console.log(`✅ ${result.count} comments seeded successfully!`);
  } catch (error: any) {
    console.error('❌ Comment seeding failed:', error.message);
    throw error;
  }
}
