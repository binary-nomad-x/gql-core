import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 1. .env file ko manually load karen
dotenv.config({ path: resolve(__dirname, '.env') });

// 2. Debugging (Optional: isko check karne ke baad hata dena)
if (!process.env.DATABASE_URL) {
  console.warn("⚠️ Warning: DATABASE_URL not found in environment variables!");
}

export default defineConfig({
  datasource: {
    // Agar env se nahi mil raha to wahi string jo aapne docker mein rakhi hai
    url: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/gql_core?schema=public",
  },
  migrations: {
    seed: 'tsx ./src/seeders/index.ts',
  },
});