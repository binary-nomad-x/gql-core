import { Role } from '@prisma/client';
import { faker } from '@faker-js/faker'

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// FIX: Added Non-null assertion (!) because we know our pools aren't empty

// * finally typescript is making sense to me
export const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

// Separate Muslim and Non-Muslim name pools
// Muslim First Names - Boys first, then Girls
const muslimBoyFirstNames = ['Ahmed', 'Mohammed', 'Ali', 'Hassan', 'Hussain', 'Omar', 'Yusuf', 'Ibrahim', 'Abdullah', 'Hamza', 'Bilal', 'Zain'];

// Muslim First Names - Girls
const muslimGirlFirstNames = ['Fatima', 'Aisha', 'Maryam', 'Zainab', 'Hafsa', 'Sumaya', 'Khadija', 'Asma', 'Amna', 'Sana', 'Hina', 'Noor'];

// Non-Muslim First Names - Boys first, then Girls  
const nonMuslimBoyFirstNames = ['Mike', 'Alex', 'John', 'David', 'James', 'Chris', 'Daniel', 'Ryan', 'Matthew', 'Andrew', 'Kevin', 'Steven'];

// Non-Muslim First Names - Girls
const nonMuslimGirlFirstNames = ['Sarah', 'Emma', 'Linda', 'Sophia', 'Emily', 'Anna', 'Jessica', 'Jennifer', 'Michelle', 'Lisa', 'Amy', 'Rachel'];

// Muslim Last Names ONLY (for Muslim first names)
const muslimLastNames = ['Khan', 'Malik', 'Ahmed', 'Raza', 'Shah', 'Siddiqui', 'Choudhary', 'Hussain', 'Patel', 'Iqbal', 'Mirza', 'Sheikh'];

// Non-Muslim Last Names ONLY (for Non-Muslim first names)
const nonMuslimLastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Taylor', 'Anderson', 'Thomas'];

const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'example.com'];
const postTitles = ['Getting started with Prisma', 'Why TypeScript is the future', 'PostgreSQL vs MySQL', 'Top 10 coding habits'];
const loremText = ['Lorem ipsum dolor sit amet...', 'Sed do eiusmod tempor...', 'Ut enim ad minim veniam...'];

// Helper to pick first name based on gender and origin
const getRandomFirstName = () => {
  const isMuslim = randomInt(0, 1) === 1;
  const isBoy = randomInt(0, 1) === 1;

  if (isMuslim) {
    return isBoy
      ? randomItem(muslimBoyFirstNames)
      : randomItem(muslimGirlFirstNames);
  } else {
    return isBoy
      ? randomItem(nonMuslimBoyFirstNames)
      : randomItem(nonMuslimGirlFirstNames);
  }
};

// Helper to get matching last name based on first name origin
const getMatchingLastName = (firstName: string): string => {
  const isMuslim = muslimBoyFirstNames.includes(firstName) || muslimGirlFirstNames.includes(firstName);

  let lastNames = isMuslim ? muslimLastNames : nonMuslimLastNames;
  let lName = randomItem(lastNames);

  // Ensure first and last names are never the same
  while (firstName === lName) {
    lName = randomItem(lastNames);
  }

  return lName;
};

export const generateUser = (id: number) => {
  // FIX: Using non-null assertion or checking against length properly
  const fName = getRandomFirstName();
  const lName = getMatchingLastName(fName);

  return {
    id, // Mandatory for bulk relation seeding
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${id}@${domains[id % domains.length]}`,
    name: `${fName} ${lName}`,
    age: randomInt(18, 65),
    // FIX: Cast string to Role Enum
    role: (randomInt(0, 10) > 8 ? 'ADMIN' : 'USER') as Role,
  };
};

export const generateProfile = (userId: number) => ({
  userId,
  bio: randomItem(['Senior Dev', 'Junior Dev', 'Tech Lead', 'Student', 'Freelancer']),
  avatar: `https://i.pravatar.cc/150?u=${userId}`
});

export const generatePost = (authorId: number) => ({
  authorId,
  title: randomItem(postTitles),
  slug: `post-${authorId}-${randomInt(1000, 9999)}`,
  content: randomItem(loremText),
  published: randomInt(0, 2) > 0,
  viewCount: randomInt(0, 5000),
});

export const generateComment = (authorId: number, postId: number) => ({
  authorId,
  postId,
  text: randomItem(loremText),
});

export const generateNewsletter = () => ({
  email: `newsletter+${randomInt(10000, 99999)}@${randomItem(domains)}`,
});
