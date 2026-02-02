import { prisma } from '../db';
import { tags } from './lib';

/**
 * Seeds tags.
 */
export async function seedTags() {
    console.log(`🏷️ Seeding ${tags.length} Tags...`);

    await prisma.tag.createMany({
        data: tags.map(name => ({ name })),
        skipDuplicates: true,
    });

    console.log(`✅ ${tags.length} tags seeded!`);
}
