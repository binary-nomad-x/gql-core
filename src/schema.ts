export const typeDefs = `#graphql
  enum Role {
    USER
    ADMIN
    EDITOR
  }

  enum ProductStatus {
    ACTIVE
    INACTIVE
    OUT_OF_STOCK
  }

  type User {
    id: ID!
    email: String!
    name: String
    age: Int
    role: Role
    isVerified: Boolean
    metadata: String
    lastLogin: String
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
    slug: String!
    content: String
    published: Boolean
    viewCount: Int
    rating: Float
    author: User
    categories: [Category]
    tags: [Tag]
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Category {
    id: ID!
    name: String!
    short_description: String
  }

  type Product {
    id: ID!
    sku: String!
    name: String!
    description: String
    price: Float!
    stock: Int!
    attributes: String
    status: ProductStatus
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts(take: Int, skip: Int): [Post]
    categories: [Category]
    products(status: ProductStatus): [Product]
  }
`;