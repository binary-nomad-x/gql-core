import { prisma } from './db';
import { ProductStatus } from '@prisma/client';

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany({
      include: { profile: true, posts: true }
    }),

    user: (_: any, { id }: { id: string }) => prisma.user.findUnique({
      where: { id: Number(id) },
      include: { profile: true, posts: true }
    }),

    posts: (_: any, { take = 20, skip = 0 }: { take: number, skip: number }) => prisma.post.findMany({
      take,
      skip,
      include: { author: true, categories: true, tags: true }
    }),

    categories: () => prisma.category.findMany({
      include: { posts: true }
    }),

    products: (_: any, { status }: { status?: ProductStatus }) => prisma.product.findMany({
      where: status ? { status } : undefined
    })
  },

  User: {
    email: (parent: any) => parent.email.toLowerCase(),
    lastLogin: (parent: any) => parent.lastLogin?.toISOString(),
    metadata: (parent: any) => JSON.stringify(parent.metadata)
  },

  Post: {
    rating: (parent: any) => parent.rating ? parseFloat(parent.rating.toString()) : null
  },

  Product: {
    price: (parent: any) => parseFloat(parent.price.toString()),
    attributes: (parent: any) => JSON.stringify(parent.attributes)
  }
};