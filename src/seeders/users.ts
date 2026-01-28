// src/seeders/users.ts
import { PrismaClient } from '@prisma/client';
import { generateUser, generateProfile } from './lib';

const prisma = new PrismaClient();
const USER_COUNT = 500;

export async function seedUsers() {
  console.log(`👤 Seeding ${USER_COUNT} Users and Profiles...`);
  
  // 1. Generate Data Arrays
  const users = [];
  const profiles = [];

  for (let i = 1; i <= USER_COUNT; i++) {
    const user = generateUser(i);
    users.push(user);
    profiles.push(generateProfile(i)); // Profile ID must match User ID (assuming incremental)
  }

  // 2. Insert Users in Bulk
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  // 3. Insert Profiles in Bulk (Using the IDs we just generated)
  await prisma.profile.createMany({
    data: profiles,
    skipDuplicates: true,
  });
}