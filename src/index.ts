import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Type Definitions (Aapka API kaisa dikhega)
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String
    email: String
  }
  type Query {
    users: [User]
  }
`;

// 2. Resolvers (Data kahan se aayega)
const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server ready at ${url}`);