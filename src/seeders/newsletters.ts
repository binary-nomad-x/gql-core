import { generateNewsletter } from './lib';
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