import { generateNewsletter } from './lib';
import { prisma } from '../db';
import * as cliProgress from 'cli-progress';

const NEWSLETTER_COUNT = 1000;

/**
 * Seeds newsletter subscriptions with a progress bar.
 */
export async function seedNewsletters() {
  console.log(`📧 Seeding ${NEWSLETTER_COUNT} Newsletters...`);

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(NEWSLETTER_COUNT, 0);

  const emails = [];
  for (let i = 0; i < NEWSLETTER_COUNT; i++) {
    emails.push(generateNewsletter());
    bar.update(i + 1);
  }
  bar.stop();

  await prisma.newsletter.createMany({
    data: emails,
    skipDuplicates: true,
  });

  console.log(`✅ Newsletters seeded successfully!`);
}