# 🛠️ Prisma Migration Master Guide

This guide covers everything you need to know about managing your database schema with Prisma, from basic updates to the "nuclear" reset option.

## 1. Basic Migration (The Standard Way)

Whenever you change your `schema.prisma` file, run this to sync your database.

```bash
npx prisma migrate dev --name <migration_name>

```

**What it does:**

* Compares `schema.prisma` with your database.
* Generates a new SQL migration file in `/prisma/migrations`.
* Applies the SQL to your database.
* Updates the **Prisma Client** (so you get TypeScript autocomplete).

---

## 2. The Flags (Customizing the Behavior)

### `--name` (Labeling)

Gives your migration a descriptive name.

```bash
npx prisma migrate dev --name add_user_profile

```

### `--create-only` (The Draft Mode)

Creates the SQL file but **does not** apply it to the database. Use this if you want to manually edit the SQL before it runs.

```bash
npx prisma migrate dev --create-only

```

### `--skip-generate` (No Client Update)

Updates the database but skips regenerating the Prisma Client.

```bash
npx prisma migrate dev --skip-generate

```

---

## 3. The Nuclear Option (Resetting) ☢️

If your database becomes messy or you want to start from scratch, use the reset command.

```bash
npx prisma migrate reset

```

**⚠️ WARNING:**

* **Deletes all data** in your database.
* Drops all tables and recreates them from scratch.
* Runs all migration files in order.
* Automatically runs your **Seed script** if you have one.

---

## 4. Production Deployment 🚀

**Never** use `migrate dev` on a production server. It might trigger a reset if it detects a conflict. Instead, use:

```bash
npx prisma migrate deploy

```

**What it does:**

* Only runs pending migrations.
* Never resets the database.
* Does not look for schema changes; it only executes existing `.sql` files.

---

## 5. Troubleshooting Commands

| Command               | Usage                                                                      |
| --------------------- | -------------------------------------------------------------------------- |
| `npx prisma status`   | Check if your database is in sync with your migrations.                    |
| `npx prisma studio`   | Open a visual editor to see your data and verify migrations.               |
| `npx prisma generate` | Manually recreate the Prisma Client (run this if VS Code shows red lines). |

---


## 6 . Another Reset thing 

Sometimes the client is not loaded with all the relations the code have, migration, relations, resolvers etc

`
Remove-Item -Recurse -Force node_modules/.prisma; npx prisma generate
`

## 💡 Pro Tip: The Shadow Database

When you run `migrate dev`, Prisma creates a temporary "Shadow Database" on your PostgreSQL server. It uses this to "test" the migrations before applying them to your main database. This ensures your migration history is clean and consistent!
