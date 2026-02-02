import { randomItem, loremText } from './lib';
import { prisma } from '../db';
import * as cliProgress from 'cli-progress';

const COMMENT_COUNT = 3000;

export async function seedComments() {
  console.log(`💬 Seeding ${COMMENT_COUNT} Comments...`);

  const userIds = (await prisma.user.findMany({ select: { id: true } })).map(u => u.id);
  const postIds = (await prisma.post.findMany({ select: { id: true } })).map(p => p.id);

  if (userIds.length === 0 || postIds.length === 0) {
    console.error('❌ No users or posts found!');
    return;
  }

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(COMMENT_COUNT, 0);

  const comments = [];
  for (let i = 0; i < COMMENT_COUNT; i++) {
    comments.push({
      authorId: randomItem(userIds),
      postId: randomItem(postIds),
      text: randomItem(loremText)
    });
    bar.update(i + 1);
  }
  bar.stop();

  try {
    const result = await prisma.comment.createMany({
      data: comments,
      skipDuplicates: true,
    });
    console.log(`✅ ${result.count} comments seeded!`);
  } catch (error: any) {
    console.error('❌ Comment seeding failed:', error.message);
    throw error;
  }
}
