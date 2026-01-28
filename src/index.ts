import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`
🚀 Apollo Server Ready
🌍 URL: ${url}
🛠️  Mode: Development
    `);
  } catch (error) {
    console.error("💀 Startup Error:", error);
  }
}

startServer();