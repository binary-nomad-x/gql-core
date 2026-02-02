import { Role } from '@prisma/client';
import { muslimBoyFirstNames, nonMuslimBoyFirstNames, nonMuslimGirlFirstNames, muslimLastNames, nonMuslimLastNames } from '../data/names';
import { domains, postTitles, loremText } from '../data/content';
export { loremText };

/**
 * Utility to generate a random integer between min and max (inclusive).
 */
export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Utility to pick a random item from an array.
 * The '!' is a non-null assertion, used here because we know our data arrays are not empty.
 */
export const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

/**
 * Utility to pick multiple random unique items from an array.
 * This is more efficient than shuffling the whole array when we only need a few items.
 */
export const randomItems = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

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

/**
 * Generates a random User object.
 */
export const generateUser = (id: number) => {
  const fName = getRandomFirstName();
  const lName = getMatchingLastName(fName);

  return {
    id, // Providing ID allows us to reference it in relations during seeding
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${id}@${domains[id % domains.length]}`,
    name: `${fName} ${lName}`,
    age: randomInt(18, 65),
    role: (randomInt(0, 10) > 8 ? 'ADMIN' : 'USER') as Role,
  };
};

/**
 * Generates a Profile object for a given User ID.
 */
export const generateProfile = (userId: number) => ({
  userId,
  bio: randomItem(['Senior Dev', 'Junior Dev', 'Tech Lead', 'Student', 'Freelancer', 'Open Source Contributor', 'GraphQL Enthusiast']),
  avatar: `https://i.pravatar.cc/150?u=${userId}`
});

/**
 * Generates a Post object for a given Author ID.
 * Added 'index' to ensure unique slugs across large datasets.
 */
export const generatePost = (authorId: number, index: number) => {
  const title = randomItem(postTitles);
  return {
    authorId,
    title,
    // Using index ensures uniqueness even with high POST_COUNT
    slug: `${title.toLowerCase().replace(/ /g, '-')}-${index}-${randomInt(1000, 9999)}`,
    content: randomItem(loremText),
    published: randomInt(0, 10) > 2, // 80% chance of being published
    viewCount: randomInt(0, 5000),
  };
};

/**
 * Generates a Comment object.
 */
export const generateComment = (authorId: number, postId: number) => ({
  authorId,
  postId,
  text: randomItem(loremText),
});

/**
 * Generates a Newsletter subscription object.
 */
export const generateNewsletter = () => ({
  email: `newsletter+${randomInt(100000, 999999)}@${randomItem(domains)}`,
});
