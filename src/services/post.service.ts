import { prisma } from '../db';
import { Prisma } from '@prisma/client';

/**
 * PostService - Handles all business logic for Posts.
 * This is where we write reusable logic that controllers can call.
 */
export class PostService {
    static async getAllPosts(params: { skip?: number; take?: number; search?: string }) {
        const { skip, take, search } = params;
        return prisma.post.findMany({
            skip,
            take,
            where: search ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            } : undefined,
            include: {
                author: true,
                categories: true,
                tags: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async getPostById(id: number) {
        return prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                categories: true,
                comments: { include: { author: true } }
            }
        });
    }

    static async createPost(data: Prisma.PostCreateInput) {
        return prisma.post.create({ data });
    }

    static async updatePost(id: number, data: Prisma.PostUpdateInput) {
        return prisma.post.update({
            where: { id },
            data
        });
    }

    static async deletePost(id: number) {
        return prisma.post.delete({
            where: { id }
        });
    }

    static async getProductInventory() {
        // Shared service logic example
        return prisma.product.findMany({
            where: { stock: { gt: 0 } }
        });
    }
}
