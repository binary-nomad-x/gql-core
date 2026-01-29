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

// Extended domains (realistic professional + personal emails)
const domains = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com',
  'example.com', 'protonmail.com', 'icloud.com', 'zoho.com',
  'aol.com', 'live.com', 'yandex.com', 'mail.com',
  'inbox.com', 'gmx.com', 'fastmail.com', 'tutanota.com'
];

// Extended post titles (developer-focused, realistic blog posts)
const postTitles = [
  'Getting started with Prisma', 'Why TypeScript is the future',
  'PostgreSQL vs MySQL', 'Top 10 coding habits', 'React Hooks best practices',
  'Node.js performance optimization', 'Docker for developers',
  'GraphQL vs REST API', 'Microservices architecture patterns',
  'Clean Code principles', 'Testing React with Jest', 'State management in Angular',
  'Building scalable APIs with NestJS', 'Database indexing strategies',
  'CSS Grid vs Flexbox', 'WebAssembly crash course', 'Serverless architecture guide',
  'Authentication with JWT', 'Progressive Web Apps tutorial', 'TypeScript advanced types',
  'MongoDB aggregation pipeline', 'Redis caching patterns', 'CI/CD pipelines explained'
];

// Extended lorem text (varied lengths, realistic content snippets)
const loremText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum sem.',
  'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.',
  'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ornare.',
  'Fusce vehicula dolor arcu, sed pulvinar nibh laoreet a. Sed sed nisi quam. Sed ac orci quis tortor.',
  'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.',
  'Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Sed laoreet odio et arcu.',
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean ultricies mi vitae est.',
  'Mauris eleifend, quam a volutpat ullamcorper, sem libero elementum tellus, id cursus velit justo eu sapien.'
];

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
