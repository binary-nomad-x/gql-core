import { Prisma } from '@prisma/client';
import { generateUser, generateProfile } from './lib';
import { prisma } from '../db';

const USER_COUNT = 500;

/**
 * Seeds Users and their corresponding Profiles.
 * Uses a transaction for atomicity and speed.
 */
export async function seedUsers() {
  console.log(`🚀 Seeding ${USER_COUNT} Users & Profiles...`);

  // 1. Generate User Data
  // We use IDs starting from 1 for easier relation mapping in other seeders if needed
  const users: Prisma.UserCreateManyInput[] = Array.from({ length: USER_COUNT }).map((_, i) =>
    generateUser(i + 1)
  );

  // 2. Generate Profile Data
  const profiles: Prisma.ProfileCreateManyInput[] = Array.from({ length: USER_COUNT }).map((_, i) =>
    generateProfile(i + 1)
  );

  // 3. Batch Insert using Transaction
  // prisma.$transaction ensures that either both steps succeed or both fail.
  try {
    await prisma.$transaction([
      prisma.user.createMany({ data: users, skipDuplicates: true }),
      prisma.profile.createMany({ data: profiles, skipDuplicates: true }),
    ]);
    console.log(`✅ ${USER_COUNT} Users and Profiles seeded successfully!`);
  } catch (error) {
    console.error('❌ User/Profile seeding failed:', error);
    throw error;
  }
}