import { Role, ProductStatus } from '@prisma/client';
import { muslimBoyFirstNames, nonMuslimBoyFirstNames, nonMuslimGirlFirstNames, muslimLastNames, nonMuslimLastNames } from '../data/names';
import { domains, postTitles, loremText } from '../data/content';

export { loremText };

/**
 * Utility to generate a random integer between min and max (inclusive).
 */
export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Utility to pick a random item from an array.
 */
export const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

/**
 * Utility to pick multiple random unique items from an array.
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

const getMatchingLastName = (firstName: string): string => {
  const isMuslim = muslimBoyFirstNames.includes(firstName) || nonMuslimGirlFirstNames.includes(firstName);
  let lastNames = isMuslim ? muslimLastNames : nonMuslimLastNames;
  let lName = randomItem(lastNames);
  while (firstName === lName) {
    lName = randomItem(lastNames);
  }
  return lName;
};

/**
 * Generates a random User object with new fields.
 */
export const generateUser = (id: number) => {
  const fName = getRandomFirstName();
  const lName = getMatchingLastName(fName);

  return {
    id,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${id}@${domains[id % domains.length]}`,
    name: `${fName} ${lName}`,
    age: randomInt(18, 65),
    role: (randomInt(0, 10) > 8 ? 'ADMIN' : 'USER') as Role,
    isVerified: randomInt(0, 1) === 1,
    lastLogin: new Date(Date.now() - randomInt(0, 10000000000)),
    metadata: {
      loginCount: randomInt(1, 100),
      preferredTheme: randomItem(['dark', 'light', 'system']),
      newsletterSubscribed: randomInt(0, 1) === 1
    }
  };
};

export const generateProfile = (userId: number) => ({
  userId,
  bio: randomItem(['Senior Dev', 'Junior Dev', 'Tech Lead', 'Student', 'Freelancer', 'Open Source Contributor', 'GraphQL Enthusiast']),
  avatar: `https://i.pravatar.cc/150?u=${userId}`
});

/**
 * Generates a Post object with rating.
 */
export const generatePost = (authorId: number, index: number) => {
  const title = randomItem(postTitles);
  return {
    authorId,
    title,
    slug: `${title.toLowerCase().replace(/ /g, '-')}-${index}-${randomInt(1000, 9999)}`,
    content: randomItem(loremText),
    published: randomInt(0, 10) > 2,
    viewCount: randomInt(0, 5000),
    rating: (randomInt(10, 50) / 10).toFixed(2), // 1.00 to 5.00
  };
};

export const generateComment = (authorId: number, postId: number) => ({
  authorId,
  postId,
  text: randomItem(loremText),
});

export const generateNewsletter = () => ({
  email: `newsletter+${randomInt(100000, 999999)}@${randomItem(domains)}`,
});

/**
 * Generates a random Product.
 */
export const generateProduct = (index: number) => ({
  sku: `SKU-${randomInt(10000, 99999)}-${index}`,
  name: `Premium ${randomItem(['Keyboard', 'Mouse', 'Monitor', 'Laptop', 'Headset', 'Chair'])} v${index}`,
  description: `A high-quality ${randomItem(['device', 'gadget', 'accessory'])} for professionals.`,
  price: (randomInt(1000, 50000) / 100).toFixed(2), // 10.00 to 500.00
  stock: randomInt(0, 200),
  status: randomItem(['ACTIVE', 'INACTIVE', 'OUT_OF_STOCK']) as ProductStatus,
  attributes: {
    color: randomItem(['Black', 'White', 'Space Gray', 'Midnight']),
    warranty: `${randomInt(1, 3)} years`,
    weight: `${randomInt(100, 2000)}g`
  }
});

export const tags = [
  'React', 'NodeJS', 'GraphQL', 'Prisma', 'PostgreSQL', 'TypeScript',
  'WebDev', 'Backend', 'Frontend', 'Database', 'Cloud', 'DevOps'
];
