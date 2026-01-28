import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is missing!");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// single instance prisma must be used across the app
export const prisma = new PrismaClient({
  adapter,
  log: ['query', 'warn', 'error'],
});