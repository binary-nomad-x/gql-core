import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env
dotenv.config({ path: resolve(__dirname, '.env') });

export default defineConfig({
  datasource: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:password@localhost:5432/gql_core?schema=public',
  },
});
