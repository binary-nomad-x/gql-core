// src/seeders/newsletters.ts
import { PrismaClient } from '@prisma/client';
import { generateNewsletter } from './lib';

// const prisma = new PrismaClient(); // the previous way

import { prisma } from '../db';

const NEWSLETTER_COUNT = 1000;

export async function seedNewsletters() {
  console.log(`📧 Seeding ${NEWSLETTER_COUNT} Newsletters...`);

  const emails = [];
  for (let i = 0; i < NEWSLETTER_COUNT; i++) {
    emails.push(generateNewsletter());
  }

  await prisma.newsletter.createMany({
    data: emails,
    skipDuplicates: true,
  });
}