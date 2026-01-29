// src/seeders/comments.ts
import { generateComment, randomInt } from './lib';
import { prisma } from '../db';

const COMMENT_COUNT = 3000;

export async function seedComments() {
  console.log(`💬 Seeding ${COMMENT_COUNT} Comments...`);

  const userCount = await prisma.user.count();
  const postCount = await prisma.post.count();

  console.log(`📊 Found ${userCount} users, ${postCount} posts`);

  if (userCount === 0 || postCount === 0) {
    console.error('❌ No users or posts found! Seed users and posts first.');
    return;
  }

  // 🔥 FIX 1: Fetch REAL existing IDs first
  const users = await prisma.user.findMany({ select: { id: true } });
  const posts = await prisma.post.findMany({ select: { id: true } });

  const comments = [];

  for (let i = 0; i < COMMENT_COUNT; i++) {
    // 🔥 FIX 2: Pick REAL user/post IDs from actual database records
    const randomUser = users[randomInt(0, users.length - 1)]!;
    const randomPost = posts[randomInt(0, posts.length - 1)]!;

    comments.push({
      authorId: randomUser.id,  // REAL user ID
      postId: randomPost.id,    // REAL post ID
      text: generateComment(0, 0).text  // Only use text from generator
    });
  }

  try {
    const result = await prisma.comment.createMany({
      data: comments,
      skipDuplicates: true,
    });

    console.log(`✅ Seeded ${result.count} comments successfully!`);
  } catch (error: any) {
    console.error('❌ Comment seeding failed:', error.message);
    throw error;
  }
}
