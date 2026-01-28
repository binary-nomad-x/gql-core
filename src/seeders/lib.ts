// src/seeders/lib.ts

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Data Pools (To make data look realistic)
const firstNames = ['Alex', 'Sarah', 'John', 'Emma', 'Mike', 'Linda', 'David', 'Sophia', 'James', 'Emily', 'Ahmed', 'Fatima'];
const lastNames = ['Smith', 'Doe', 'Johnson', 'Brown', 'Williams', 'Garcia', 'Miller', 'Davis', 'Khan', 'Malik'];
const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'example.com'];
const postTitles = [
  'Getting started with Prisma', 'Why TypeScript is the future', 'PostgreSQL vs MySQL', 
  'Top 10 coding habits', 'Understanding GraphQL', 'Node.js best practices', 
  'Docker for Developers', 'CI/CD pipelines 101', 'Clean Code Guide', 'API Design'
];
const loremText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.'
];

export const generateUser = (id: number) => ({
  email: `${firstNames[id % firstNames.length].toLowerCase()}.${lastNames[id % lastNames.length].toLowerCase()}${id}@${domains[id % domains.length]}`,
  name: `${firstNames[id % firstNames.length]} ${lastNames[id % lastNames.length]}`,
  age: randomInt(18, 65),
  role: randomInt(0, 10) > 8 ? 'ADMIN' : 'USER',
});

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