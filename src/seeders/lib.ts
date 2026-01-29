import { Role } from '@prisma/client';
import { domains, loremText, muslimBoyFirstNames, muslimLastNames, nonMuslimBoyFirstNames, nonMuslimGirlFirstNames, nonMuslimLastNames, postTitles } from './statics';

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// FIX: Added Non-null assertion (!) because we know our pools aren't empty

// * finally typescript is making sense to me
export const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

// Helper to pick first name based on gender and origin
const getRandomFirstName = () => {
  const isMuslim = randomInt(0, 1) === 1;
  const isBoy = randomInt(0, 1) === 1;

  if (isMuslim) {
    return isBoy
      ? randomItem(muslimBoyFirstNames)
      : randomItem(nonMuslimGirlFirstNames);
  } else {
    return isBoy
      ? randomItem(nonMuslimBoyFirstNames)
      : randomItem(nonMuslimGirlFirstNames);
  }
};

// Helper to get matching last name based on first name origin
const getMatchingLastName = (firstName: string): string => {
  const isMuslim = muslimBoyFirstNames.includes(firstName) || nonMuslimGirlFirstNames.includes(firstName);

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
