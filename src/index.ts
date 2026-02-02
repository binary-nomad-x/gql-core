import express from 'express';
import { ApolloServer, HeaderMap } from '@apollo/server';
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

  // Custom GraphQL Middleware (replacing missing expressMiddleware)
  app.get('/graphql', async (req, res) => {
    // Show GraphQL Playground/Landing Page on GET
    const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        method: 'GET',
        headers: new HeaderMap(Object.entries(req.headers) as any),
        body: {},
        search: req.url.split('?')[1] || '',
      },
      context: async () => ({ req, res }),
    });
    for (const [key, value] of httpGraphQLResponse.headers) res.setHeader(key, value);
    if (httpGraphQLResponse.body.kind === 'complete') res.send(httpGraphQLResponse.body.string);
    else res.end();
  });

  app.post('/graphql', async (req, res) => {
    try {
      const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
        httpGraphQLRequest: {
          method: 'POST',
          headers: new HeaderMap(Object.entries(req.headers) as any),
          body: req.body,
          search: req.url.split('?')[1] || '',
        },
        context: async () => ({ req, res }),
      });

      for (const [key, value] of httpGraphQLResponse.headers) {
        res.setHeader(key, value);
      }
      res.status(httpGraphQLResponse.status || 200);

      if (httpGraphQLResponse.body.kind === 'complete') {
        res.send(httpGraphQLResponse.body.string);
      } else {
        for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
          res.write(chunk);
        }
        res.end();
      }
    } catch (error) {
      console.error("GraphQL Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

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
