import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // Naya import
import { Pool } from 'pg'; // Naya import
import 'dotenv/config'; // Taake .env load ho jaye

// 1. Database Connection Setup
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }); // Adapter pass karna zaroori hai

// 2. Type Definitions
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

// 3. Resolvers
const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  const { url } = await startStandaloneServer(server, { 
    listen: { port: 4000 } 
  });
  console.log(`🚀 Server ready at ${url}`);
}

startServer();