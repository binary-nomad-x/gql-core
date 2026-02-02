import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import postRoutes from './routes/post.routes';
import { HomeController } from './controllers/home.controller';

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  // 1. Setup Middleware
  app.use(express.json());
  app.use(cors());

  // 2. Setup Template Engine (EJS)
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // 3. Setup Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await server.start();

  // 4. Mount Routes
  // GraphQL
  app.use('/graphql', expressMiddleware(server) as any);

  // REST API
  app.use('/api/posts', postRoutes);

  // HTML Views
  app.get('/', HomeController.index);
  app.get('/posts', HomeController.postsPage);

  // 5. Start Server
  app.listen(PORT, () => {
    console.log(`
      🚀 Server is running!
      🌐 Home Dashboard: http://localhost:${PORT}
      📡 REST API:      http://localhost:${PORT}/api/posts
      🔍 GraphQL:       http://localhost:${PORT}/graphql
    `);
  });
}

bootstrap().catch(err => {
  console.error("💀 Startup Error:", err);
});