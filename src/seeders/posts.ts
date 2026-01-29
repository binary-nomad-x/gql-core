import { generatePost, randomInt } from './lib';
import { prisma } from '../db';

const POST_COUNT = 2000;
const USER_COUNT = 500;

export async function seedPosts() {
  console.log(`📝 Seeding ${POST_COUNT} Posts...`);

  const posts = [];

  for (let i = 0; i < POST_COUNT; i++) {
    const randomAuthorId = randomInt(1, USER_COUNT);
    posts.push(generatePost(randomAuthorId));
  }

  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });
}