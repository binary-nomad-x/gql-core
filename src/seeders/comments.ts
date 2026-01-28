// src/seeders/comments.ts
import { PrismaClient } from '@prisma/client';
import { generateComment, randomInt } from './lib';

const prisma = new PrismaClient();
const COMMENT_COUNT = 3000;
const USER_COUNT = 500;
const POST_COUNT = 2000;

export async function seedComments() {
  console.log(`💬 Seeding ${COMMENT_COUNT} Comments...`);

  const comments = [];

  for (let i = 0; i < COMMENT_COUNT; i++) {
    comments.push(generateComment(
      randomInt(1, USER_COUNT), 
      randomInt(1, POST_COUNT)
    ));
  }

  await prisma.comment.createMany({
    data: comments,
    skipDuplicates: true,
  });
}