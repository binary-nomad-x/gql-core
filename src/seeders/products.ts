import { prisma } from '../db';
import { generateProduct } from './lib';
import * as cliProgress from 'cli-progress';

const PRODUCT_COUNT = 500;

/**
 * Seeds products with a progress bar.
 */
export async function seedProducts() {
    console.log(`📦 Seeding ${PRODUCT_COUNT} Products...`);

    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar.start(PRODUCT_COUNT, 0);

    const products = [];
    for (let i = 0; i < PRODUCT_COUNT; i++) {
        products.push(generateProduct(i));
        bar.update(i + 1);
    }

    await prisma.product.createMany({
        data: products,
        skipDuplicates: true,
    });

    bar.stop();
    console.log(`✅ ${PRODUCT_COUNT} Products seeded!`);
}
