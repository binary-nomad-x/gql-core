import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding doctors...');
  await prisma.doctor.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
    },
  });

  await prisma.doctor.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Dr. Jane Smith',
      specialty: 'Dermatology',
    },
  });

  console.log('Seeding doctors done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
