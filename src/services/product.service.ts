import { prisma } from '../db';

export class ProductService {
    static async getInventory() {
        return prisma.product.findMany({
            orderBy: { stock: 'desc' }
        });
    }

    static async getLowStock() {
        return prisma.product.findMany({
            where: { stock: { lt: 10 } }
        });
    }

    static async updateStock(id: number, quantity: number) {
        return prisma.product.update({
            where: { id },
            data: { stock: { increment: quantity } }
        });
    }
}
