export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    age: Int
    profile: Profile
    posts: [Post]
  }

  type Profile {
    id: ID!
    bio: String
    avatar: String
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean
    author: User
  }

  type Category {
    id: ID!
    name: String!
    short_description: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    categories: [Category]
  }
`;