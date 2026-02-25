import { prisma } from '../db';
import { tags } from './lib';

/**
 * Seeds tags.
 */
export async function seedTags() {
  console.log(`🏷️ Seeding ${tags.length} Tags...`);

  await prisma.tag.createMany({
    data: tags.map((name: string) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`✅ ${tags.length} tags seeded!`);
}
