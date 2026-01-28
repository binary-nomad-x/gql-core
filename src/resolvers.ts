import { prisma } from './db';

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany({
      include: { profile: true, posts: true }
    }),
    
    user: (_: any, { id }: { id: string }) => prisma.user.findUnique({
      where: { id: Number(id) },
      include: { profile: true, posts: true }
    }),

    posts: () => prisma.post.findMany({
      include: { author: true, categories: true }
    }),

    categories: () => prisma.category.findMany({
      include: { posts: true }
    }),
  },
  // Field-level resolvers (Optional, but clean for complex relations)
  User: {
    email: (parent: any) => parent.email.toLowerCase(), // Example of data manipulation
  }
};