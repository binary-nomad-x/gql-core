import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { join } from 'path';

async function bootstrap() {
  dotenv.config({ path: join(__dirname, '../../../.env') });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
}

// Promises must be awaited, end with a call to .catch, end with a call to .then with a rejection handler or be explicitly marked as ignored with the `void` operator.
bootstrap();
