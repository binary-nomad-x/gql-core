// src/seeders/posts.ts
import { PrismaClient } from '@prisma/client';
import { generatePost, randomInt } from './lib';

// const prisma = new PrismaClient(); // the previuos way

import { prisma } from '../db';

const POST_COUNT = 2000;
const USER_COUNT = 500; // Must match seeders/users.ts

export async function seedPosts() {
  console.log(`📝 Seeding ${POST_COUNT} Posts...`);

  const posts = [];

  for (let i = 0; i < POST_COUNT; i++) {
    // Assign a random authorId between 1 and 500
    const randomAuthorId = randomInt(1, USER_COUNT);
    posts.push(generatePost(randomAuthorId));
  }

  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });
}