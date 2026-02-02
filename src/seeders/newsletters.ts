import { generateNewsletter } from './lib';
import { prisma } from '../db';

const NEWSLETTER_COUNT = 1000;

/**
 * Seeds newsletter subscriptions.
 */
export async function seedNewsletters() {
  console.log(`📧 Seeding ${NEWSLETTER_COUNT} Newsletter subscriptions...`);

  // Generate data in memory first
  const emails = Array.from({ length: NEWSLETTER_COUNT }).map(() => generateNewsletter());

  // Bulk creation for speed
  await prisma.newsletter.createMany({
    data: emails,
    skipDuplicates: true,
  });

  console.log(`✅ ${NEWSLETTER_COUNT} Newsletter subscriptions seeded!`);
}