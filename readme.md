# Project Name: DevFlow - SaaS Project Management & Analytics Platform

## 1. Project Overview

**DevFlow** is a B2B SaaS application designed for small development teams to manage projects, track tasks, log time, and visualize productivity analytics.

**Why this project?**

- **Data Intensive:** It involves complex relationships (Users → Teams → Projects → Tasks → Comments → Time Logs).
- **Real-time:** Uses GraphQL Subscriptions for live updates (e.g., a team member updates a task, and your screen updates instantly).
- **Full Stack Monorepo:** Forces you to manage shared types and code organization between Angular (Frontend) and NestJS (Backend).

## 2. Technology Stack & Architecture

Based on your `package.json`, here is how the architecture maps out:

| Component      | Technology                                     | Role                                                                 |
| :------------- | :--------------------------------------------- | :------------------------------------------------------------------- |
| **Database**   | PostgreSQL (via Docker local / Neon.tech prod) | Data persistence.                                                    |
| **ORM**        | Prisma (v7.4)                                  | Type-safe database access, migrations, and schema management.        |
| **Backend**    | NestJS (v11) with GraphQL (Apollo)             | API Layer. Uses **Code-First** approach (resolvers generate schema). |
| **Frontend**   | Angular (v19) + Apollo Client                  | UI Layer. Standalone components, Signals (new pattern).              |
| **Monorepo**   | NPM Workspaces                                 | Managing `apps/api` and `apps/frontend` in one repo.                 |
| **Deployment** | Vercel (Frontend) + Render/Fly.io (Backend)    | Free tier hosting.                                                   |

## 3. The "Free Tier" Deployment Strategy

Since this is for learning, we will use the "Freemium" ecosystem:

1.  **Database:** [Neon.tech](https://neon.tech/) (Serverless Postgres, generous free tier, no credit card required).
2.  **Backend API:** [Render.com](https://render.com/) or [Fly.io](https://fly.io/) (Free Web Service - spins down when idle).
3.  **Frontend UI:** [Vercel](https://vercel.com/) (Optimized for Angular, free tier).

---

## 4. Database Schema Design (Data Intensive)

This schema ensures you learn about Relations, Indexes, and Aggregations.

1.  **User:** `id`, `email`, `passwordHash`, `name`, `role` (ADMIN/MEMBER), `createdAt`.
2.  **Team:** `id`, `name`, `ownerId`.
3.  **TeamMembership:** (Many-to-Many join table) `teamId`, `userId`, `joinedAt`.
4.  **Project:** `id`, `name`, `description`, `teamId`, `status` (ACTIVE/ARCHIVED).
5.  **Task:** `id`, `title`, `description`, `projectId`, `assigneeId`, `status` (TODO/IN_PROGRESS/DONE), `priority`, `dueDate`.
6.  **TimeLog:** `id`, `taskId`, `userId`, `durationMinutes`, `loggedAt`, `description`. (Crucial for analytics).
7.  **Comment:** `id`, `taskId`, `userId`, `content`, `createdAt`.

---

## 5. Detailed Development Roadmap (3 Months)

### Month 1: Foundation, Authentication & Core CRUD

_Goal: Establish the monorepo structure, connect DB, and build the basic "Create/Read" functionality._

#### Week 1: Monorepo Setup & Database Design

- **Day 1:** Initialize the project structure.
  - Create `apps/api` (NestJS) and `apps/frontend` (Angular) folders.
  - Configure `tsconfig` paths in the root to allow code sharing (e.g., sharing DTOs).
- **Day 2:** Prisma Setup.
  - Initialize Prisma in `apps/api`.
  - Write the schema for `User`, `Team`, and `Project`.
  - Run `prisma migrate dev` to spin up the local Docker DB.
- **Day 3:** NestJS GraphQL Module Setup.
  - Install `@nestjs/graphql` `@nestjs/apollo` `graphql`.
  - Configure `GraphQLModule` in `app.module.ts` to use `autoSchemaFile` (Code-First approach).
- **Day 4:** User Resolver (Basic).
  - Create `User` model class (Prisma schema maps to GraphQL type).
  - Create a basic `UsersResolver` to fetch a user by ID.
- **Day 5:** Angular Setup.
  - Initialize Angular app inside `apps/frontend`.
  - Install `apollo-angular` and `@apollo/client`.
  - Setup `GraphQLModule` in Angular to connect to `http://localhost:3000/graphql`.
- **Day 6-7:** Testing Connection.
  - Run both servers using `npm run dev`.
  - Verify Angular can query `users` from the NestJS backend.

#### Week 2: Authentication (The Hard Part)

- **Day 1-2:** Auth Backend.
  - Implement `AuthService` using `bcrypt` for password hashing.
  - Implement JWT generation using `@nestjs/jwt`.
  - Create `AuthResolver` with `login` and `register` mutations.
- **Day 3:** GraphQL Context.
  - Create a GraphQL Guard (`GqlAuthGuard`) to protect routes.
  - Learn how to inject the `User` object into the resolver context.
- **Day 4-5:** Auth Frontend.
  - Create Login/Register pages in Angular.
  - Use Angular Services to store the JWT token (LocalStorage).
  - Attach the token to every Apollo request via an `HttpLink` interceptor.
- **Day 6-7:** UI Implementation.
  - Build a basic Layout Component (Sidebar + Navbar).
  - Protect Angular Routes using `CanActivateFn` guards.

#### Week 3: Team & Project Management (CRUD)

- **Day 1:** Prisma Relations.
  - Update schema for `Team` and `Project`. Run migration.
  - Write Prisma queries that include relations (e.g., `findTeamWithProjects`).
- **Day 2-3:** Team Resolver & Service.
  - Create Team: Mutation to create a team (assign current user as owner).
  - Get My Teams: Query to fetch teams where the user is a member.
- **Day 4-5:** Angular State Management.
  - Create an Angular Service for Team management.
  - Use Apollo `watchQuery` to fetch teams.
  - Build the UI: "Create Team" Modal and "Team List" view.
- **Day 6-7:** Project CRUD.
  - Implement full CRUD for Projects (Create, Read, Update, Delete).
  - Build the Project Dashboard UI (Grid view of projects).

#### Week 4: Task Management System

- **Day 1-2:** Task Backend.
  - Define `Task` schema relations.
  - Resolvers: `createTask`, `updateTaskStatus`.
  - _Learning:_ Complex filtering (e.g., Get all tasks for Project X, sorted by Priority).
- **Day 3-4:** Task Frontend - The Board.
  - Build a "Kanban Board" style UI (columns for TODO, IN_PROGRESS, DONE).
  - Query tasks and group them by status in the frontend.
- **Day 5:** Optimistic UI Updates.
  - When a user moves a task card, update the UI _immediately_ before the server responds.
  - _Learning:_ Apollo Cache update logic (handling the server response vs local cache).
- **Day 6-7:** Error Handling & Loading States.
  - Implement Global Error Interceptor in Angular.
  - Add Skeleton loaders for data fetching states.

---

### Month 2: Advanced Data & Real-Time Features

_Goal: Implement "Data Intensive" features like analytics and real-time collaboration._

#### Week 5: GraphQL Subscriptions (Real-time)

- **Day 1:** Backend Subscriptions.
  - Configure NestJS to handle subscriptions (install `graphql-subscriptions` `ws`).
  - Create `taskUpdated` subscription trigger.
- **Day 2:** Frontend Subscriptions.
  - Configure Angular Apollo to use a WebSocket link.
  - Subscribe to `taskUpdated`.
- **Day 3-4:** Live Collaboration.
  - Open two browser windows. Update a task in one; watch it update in the other instantly.
  - Implement a "User is typing..." indicator for comments (optional but cool).
- **Day 5-7:** Comments System.
  - Backend: Nested resolvers (Task -> Comments).
  - Frontend: Comment thread component under Task details.
  - Implement Pagination (Cursor-based) for comments (learn `take` and `skip` in Prisma).

#### Week 6: Data Visualization (Analytics)

- **Day 1:** Aggregation Logic.
  - Backend: Write complex Prisma queries to calculate "Total Hours Logged per Project" or "Tasks Completed per Week".
  - Return this data as a GraphQL Type.
- **Day 2-3:** Charting Library.
  - Install a charting library (e.g., `ng-apexcharts` or `chart.js`) in Angular.
  - Build an "Analytics Dashboard" page.
- **Day 4-5:** Date Filtering.
  - Allow users to select a date range (Start Date - End Date).
  - Pass these arguments to the GraphQL query to filter the analytics data.
- **Day 6-7:** Export Data.
  - Generate a CSV report of tasks from the backend.
  - Trigger a file download in the browser from an API call.

#### Week 7: Search & Filtering

- **Day 1:** Full-Text Search.
  - Backend: Implement search logic using Prisma's `contains` or Postgres specific search features.
  - Search across Tasks and Projects.
- **Day 2-3:** Advanced Filtering UI.
  - Frontend: Build a "Filter Bar" (Filter by Assignee, Priority, Status).
  - Dynamically construct GraphQL query variables based on filter selection.
- **Day 4-7:** Code Generation (Monorepo Power).
  - Use a tool like `graphql-codegen` to automatically generate TypeScript interfaces in Angular based on the Backend Schema.
  - _Why?_ This ensures your frontend types never go out of sync with your backend.

#### Week 8: Performance Optimization

- **Day 1-2:** N+1 Problem.
  - Learn about the N+1 problem in GraphQL (fetching a list of tasks, then the user for each task separately).
  - Implement `dataloader` package in NestJS to batch SQL queries.
- **Day 3-4:** Angular Performance.
  - Use `OnPush` change detection strategy.
  - Implement "Virtual Scrolling" for long lists of tasks (Angular CDK).
- **Day 5-7:** API Security.
  - Implement Field-level permissions (e.g., only Admins can see the `deletedAt` timestamp).
  - Rate Limiting middleware in NestJS.

---

### Month 3: SaaS Features & Deployment

_Goal: Polish the app and deploy to production for free._

#### Week 9: SaaS Mechanics

- **Day 1-2:** User Invitations.
  - Flow: User enters email -> Backend creates "Pending Invitation" -> Sends email (using a mock service like Mailtrap.io).
- **Day 3-4:** Handling Invites.
  - Frontend: "Accept Invitation" page.
  - Logic: Add user to `TeamMembership` table upon acceptance.
- **Day 5-7:** User Settings.
  - Update Profile (Name, Avatar URL).
  - Change Password logic.
  - Delete Account (Cascade delete logic in Prisma - what happens to the user's tasks?).

#### Week 10: Production Preparation

- **Day 1-2:** Environment Variables.
  - Securely manage `.env` files.
  - Setup distinct environments for `development` and `production`.
- **Day 3-4:** Dockerizing for Production.
  - Create a `Dockerfile` for the NestJS API (Multistage build to keep image small).
  - Ensure Angular build is served statically (NestJS can serve the Angular static files, or you can host them separately).
- **Day 5-7:** CI/CD Pipeline (GitHub Actions).
  - Create a workflow that runs `npm run test` and `npm run build` on every Pull Request.
  - Automate deployment triggers.

#### Week 11: Deployment (The Free Tier Setup)

- **Day 1:** Database Setup (Neon.tech).
  - Create a free account.
  - Get the Connection String.
  - Run Prisma migrations against the cloud DB (`prisma migrate deploy`).
- **Day 2:** Backend Deployment (Render/Fly.io).
  - Connect your GitHub repo.
  - Configure Build Command (`npm install && npm run build:api`).
  - Configure Start Command (`npm run start:prod`).
  - Set Environment Variables (DATABASE_URL, JWT_SECRET).
- **Day 3:** Frontend Deployment (Vercel).
  - Install Vercel CLI.
  - Configure `vercel.json` to build the Angular app.
  - Set `GRAPHQL_API_URL` to the Render URL.
- **Day 4-5:** Domain & CORS.
  - Configure CORS in NestJS to accept requests from your Vercel URL.
  - Test the live application.
- **Day 6-7:** Bug Fixing.
  - Fix issues arising from "Production environment" vs "Development environment" (e.g., mixed content warnings).

#### Week 12: Final Polish & Documentation

- **Day 1-2:** UI Polish.
  - Add loading spinners.
  - Fix mobile responsiveness (CSS).
  - Add a Landing Page explaining the app.
- **Day 3-4:** Documentation.
  - Write a README explaining how to run the project.
  - Document the GraphQL Schema (using GraphQL Playground).
- **Day 5-7:** Final Review.
  - Walk through the entire user flow.
  - Celebrate building a full-stack SaaS!

---

## Key "Learning Outcomes" Checkpoints

1.  **Monorepo Management:** You will learn how to share code (interfaces/types) between frontend and backend to prevent type mismatches.
2.  **Prisma Mastery:** You will move beyond simple CRUD to aggregations, relations, and migrations.
3.  **GraphQL Depth:** You will understand why GraphQL is preferred for complex data (fetching nested relations in one go) over REST.
4.  **Angular Signals:** Angular 19 uses Signals. You will rewrite standard Observable subscriptions to use Signals for cleaner code.
5.  **DevOps:** You will learn how to deploy a database, a Node server, and a Static site separately and wire them together.

This roadmap is aggressive but complete. Follow the weekly goals, and you will have a portfolio piece that demonstrates professional-grade architectural skills.
