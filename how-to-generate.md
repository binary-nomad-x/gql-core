# **Comprehensive Instruction Manual for Monorepo Operations**

This guide provides a complete series of commands and instructions for managing your **GQL Monorepo** setup, including generating resources, creating migrations, running Prisma operations, setting up GraphQL, and managing the backend and frontend. Additionally, tables are included to summarize key commands and their purposes.

---

## **1. Generating Resources in the Backend (NestJS)**

### **Steps to Generate Resources:**

#### **a. Generate a Module**

A module groups related components, services, and resolvers.

```bash
npx nest g mo modules/<module-name> api
```

Example:

```bash
npx nest g mo modules/user api
```

#### **b. Generate a Resolver**

Resolvers handle GraphQL queries and mutations.

```bash
npx nest g r modules/<module-name> api
```

Example:

```bash
npx nest g r modules/user api
```

#### **c. Generate a Service**

Services contain business logic.

```bash
npx nest g s modules/<module-name> api
```

Example:

```bash
npx nest g s modules/user api
```

#### **d. Register the Module**

Ensure the generated module is registered in the main `AppModule` (`apps/api/src/app.module.ts`):

```typescript
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
```

---

## **2. Generating Resources in the Frontend (Angular)**

### **Steps to Generate Resources:**

#### **a. Generate a Component**

Components define UI elements.

```bash
npx ng g c components/<component-name> --project=frontend
```

Example:

```bash
npx ng g c components/user-profile --project=frontend
```

#### **b. Generate a Service**

Services manage data and business logic.

```bash
npx ng g s services/<service-name> --project=frontend
```

Example:

```bash
npx ng g s services/user --project=frontend
```

#### **c. Generate a Module**

Modules group related components, services, and directives.

```bash
npx ng g m modules/<module-name> --project=frontend
```

Example:

```bash
npx ng g m modules/dashboard --project=frontend
```

#### **d. Register the Component or Module**

Ensure the generated component or module is declared in the appropriate module (e.g., `AppModule` or a feature module).

---

## **3. Managing Database Schema with Prisma**

### **Steps for Prisma Operations:**

#### **a. Push Schema Changes**

After modifying the `prisma/schema.prisma` file, push changes to the database:

```bash
npm run db:push
```

#### **b. Generate Prisma Client**

Regenerate the Prisma client after schema changes:

```bash
npm run db:gen
```

#### **c. Open Prisma Studio**

Visualize and interact with your database:

```bash
npm run db:studio
```

#### **d. Create Migrations**

For production environments, create migrations:

```bash
npm run db:migrate
```

---

## **4. Running the Monorepo**

### **a. Start Development Servers**

Run both the backend and frontend in parallel:

```bash
npm run dev
```

- **API**: Accessible at `http://localhost:3001/graphql`.
- **Web**: Accessible at `http://localhost:4201`.

### **b. Build for Production**

Build both the backend and frontend:

```bash
npm run build
```

---

## **5. Tables of Commands**

### **Backend (NestJS) Commands**

| Task                      | Command                                   | Example                                |
| ------------------------- | ----------------------------------------- | -------------------------------------- |
| Generate Module           | `npx nest g mo modules/<module-name> api` | `npx nest g mo modules/user api`       |
| Generate Resolver         | `npx nest g r modules/<module-name> api`  | `npx nest g r modules/user api`        |
| Generate Service          | `npx nest g s modules/<module-name> api`  | `npx nest g s modules/user api`        |
| Generate (master-command) | `npx nest g r modules/<module-name> api`  | `npx nest g resource modules/user api` |
| Start Backend             | `npm run start:api`                       |                                        |
| Build Backend             | `npm run build:api`                       |                                        |

---

### **Frontend (Angular) Commands**

| Task               | Command                                                     | Example                                                 |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------------- |
| Generate Component | `npx ng g c components/<component-name> --project=frontend` | `npx ng g c components/user-profile --project=frontend` |
| Generate Service   | `npx ng g s services/<service-name> --project=frontend`     | `npx ng g s services/user --project=frontend`           |
| Generate Module    | `npx ng g m modules/<module-name> --project=frontend`       | `npx ng g m modules/dashboard --project=frontend`       |
| Start Frontend     | `npm run start:web`                                         |                                                         |
| Build Frontend     | `npm run build:web`                                         |                                                         |

---

### **Prisma Commands**

| Task                   | Command              | Example |
| ---------------------- | -------------------- | ------- |
| Push Schema Changes    | `npm run db:push`    |         |
| Generate Prisma Client | `npm run db:gen`     |         |
| Open Prisma Studio     | `npm run db:studio`  |         |
| Create Migration       | `npm run db:migrate` |         |
| Start Database         | `npm run db:up`      |         |
| Stop Database          | `npm run db:down`    |         |

---

### **GraphQL Setup in NestJS**

#### **a. Define GraphQL Schema**

In `apps/api/src/modules/<module-name>/<module-name>.resolver.ts`, define queries and mutations:

```typescript
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
```

#### **b. Register GraphQL Module**

Ensure the `GraphQLModule` is registered in `apps/api/src/app.module.ts`:

```typescript
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
```

---

## **6. Troubleshooting**

#### **a. WASM Error**

If Prisma generation fails, try:

```bash
npm install --ignore-scripts
npx prisma generate
```

#### **b. CORS Issues**

Ensure the backend allows requests from the frontend URL (`http://localhost:4201`).

#### **c. Port Conflicts**

Modify ports in `package.json` scripts if necessary.

---

By following this comprehensive manual, you can efficiently manage all aspects of your **GQL Monorepo**, from generating resources to handling database migrations and running development servers.
