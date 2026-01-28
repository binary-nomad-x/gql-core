import { Role } from '@prisma/client';
import { faker } from '@faker-js/faker'

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// FIX: Added Non-null assertion (!) because we know our pools aren't empty

// * finally typescript is making sense to me
export const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

// Data Pools (muslim + non-muslims names seperate names, also muslim names men first name boy girl ka ho sakta hai, but last name hamesha male ka ho)
const firstNames = ['Alex', 'Sarah', 'John', 'Emma', 'Mike', 'Linda', 'David', 'Sophia', 'James', 'Emily', 'Ahmed', 'Fatima'];
const lastNames = ['Smith', 'Doe', 'Johnson', 'Brown', 'Williams', 'Garcia', 'Miller', 'Davis', 'Khan', 'Malik'];
const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'example.com'];
const postTitles = ['Getting started with Prisma', 'Why TypeScript is the future', 'PostgreSQL vs MySQL', 'Top 10 coding habits'];
const loremText = ['Lorem ipsum dolor sit amet...', 'Sed do eiusmod tempor...', 'Ut enim ad minim veniam...'];

export const generateUser = (id: number) => {
    // FIX: Using non-null assertion or checking against length properly
    const fName = firstNames[id % firstNames.length]!;
    const lName = lastNames[id % lastNames.length]!;

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