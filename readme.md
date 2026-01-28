# 🚀 GQL-Core: The Supercharged API ⚡

Welcome to **GQL-Core**! This isn't just another boring GraphQL backend. It’s a high-performance, modern API powerhouse built with the latest **Prisma 7** and **Apollo Server 5**. Speed, type-safety, and developer experience—all in one place! 🏎️💨

## 🛠️ The Tech Magic Stack

* **Apollo Server 5** — The brain of our GraphQL API 🧠
* **Prisma 7** — Next-gen Database ORM (now with Driver Adapters!) 💎
* **PostgreSQL 17** — Rock-solid data storage (Alpine edition) 🐘
* **Docker** — Eliminating the "it works on my machine" excuse 🐳
* **TypeScript** — Because we like our code self-documenting and bug-free 📝

---

## 🏗️ Setting Up the Beast

Let's get your environment ready for action:

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/gql-core.git
cd gql-core

```

### 2. Add the Secret Sauce (.env)

Create a `.env` file in the root directory and paste your connection string:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/gql_core?schema=public"

```

### 3. Summon the Database

Bring your PostgreSQL container to life using Docker:

```bash
docker-compose up -d

```

### 4. Database Migration

Tell Prisma to map out your schema to the database:

```bash
npx prisma migrate dev --name init

```

---

## 🚦 Ignition (Running the Project)

Time to start the engines! 🚀

```bash
npm run dev

```

Your API is now live at:
👉 **`http://localhost:4000/graphql`**

Try running this query in the Sandbox:

```graphql
query {
  users {
    id
    name
    email
  }
}

```

---

## 📂 Project Structure (Where the fun happens)

```text
gql-core/
├── prisma/
│   └── schema.prisma   # The database blueprint 🗺️
├── src/
│   ├── index.ts        # The heart of the app (Apollo Server) ❤️
├── prisma.config.ts    # Prisma 7's new configuration layer ⚙️
├── docker-compose.yaml # The database's home 🏠
└── .env                # Top Secrets! 🤫

```

---

## 🎨 Funky Features

* **Prisma 7 Native:** We’ve ditched the old ways and embraced the latest `adapter-pg` for better performance! 💅
* **Ultra Type-Safe:** TypeScript keeps us on track so we spend less time debugging and more time building. 🛡️
* **Hot Reloading:** Powered by `tsx`—change your code and see the results instantly! 🔥
* **Dockerized:** A consistent environment for everyone, everywhere. 🌍

---

## 🤝 Contribution

Got ideas to make this even funkier? Open a Pull Request! Let's revolutionize the backend world together. 🤘

---

**Made with ❤️ and way too much ☕ by [Your Name]**

