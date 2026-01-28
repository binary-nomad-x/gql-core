import { PrismaClient, Prisma } from '@prisma/client';
import { generateUser, generateProfile } from './lib';

// const prisma = new PrismaClient(); // the previous way

import { prisma } from '../db';


const USER_COUNT = 500;

export async function seedUsers() {
  console.log(`🚀 Blazing Fast Seed: ${USER_COUNT} Users & Profiles...`);

  // 1. Generate Data Arrays with Explicit Types
  // Prisma.UserCreateManyInput use karne se types ka error kabhi nahi ayega
  const users: Prisma.UserCreateManyInput[] = Array.from({ length: USER_COUNT }).map((_, i) =>
    generateUser(i + 1)
  );

  const profiles: Prisma.ProfileCreateManyInput[] = Array.from({ length: USER_COUNT }).map((_, i) =>
    generateProfile(i + 1)
  );

  // 2. Transaction for Maximum Speed
  // $transaction use karne se ya toh dono insert honge ya koi nahi (Atomic)
  try {
    await prisma.$transaction([
      prisma.user.createMany({ data: users, skipDuplicates: true }),
      prisma.profile.createMany({ data: profiles, skipDuplicates: true }),
    ]);
    console.log('✅ Bulk Seed Complete!');
  } catch (error) {
    console.error('❌ Bulk Seed Failed:', error);
  }

}