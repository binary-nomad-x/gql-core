import { Prisma } from '@prisma/client';
import { generateUser, generateProfile } from './lib';
import { prisma } from '../db';
import * as cliProgress from 'cli-progress';

const USER_COUNT = 500;

export async function seedUsers() {
  console.log(`🚀 Seeding ${USER_COUNT} Users & Profiles...`);

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(USER_COUNT, 0);

  const users: Prisma.UserCreateManyInput[] = [];
  const profiles: Prisma.ProfileCreateManyInput[] = [];

  for (let i = 0; i < USER_COUNT; i++) {
    users.push(generateUser(i + 1));
    profiles.push(generateProfile(i + 1));
    bar.update(i + 1);
  }
  bar.stop();

  try {
    await prisma.$transaction([
      prisma.user.createMany({ data: users, skipDuplicates: true }),
      prisma.profile.createMany({ data: profiles, skipDuplicates: true }),
    ]);
    console.log(`✅ Users and Profiles batch seeded!`);
  } catch (error) {
    console.error('❌ User/Profile seeding failed:', error);
    throw error;
  }
}