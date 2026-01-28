# 🚀 GQL-Core: The Supercharged API ⚡

Welcome to **GQL-Core**! Ye sirf ek boring GraphQL backend nahi hai, balki Prisma 7 aur Apollo Server ka ek zabardast combination hai jo lightning speed par chalta hai. 🏎️💨

## 🛠️ Tech Magic Stack

* **Apollo Server 5** - GraphQL ki jaan 🧠
* **Prisma 7** - Database ka naya zamana (with Adapters!) 💎
* **PostgreSQL 17** - Rock solid data storage 🐘
* **Docker** - "Mere system pe chal raha hai" wala masla khatam 🐳
* **TypeScript** - Code jo khud bolta hai 📝

---

## 🏗️ Setting Up the Beast

Pehle system ko tayyar karte hain:

1. **Repo ko clone karen:**
```bash
git clone https://github.com/your-username/gql-core.git
cd gql-core

```


2. **Secret Sauce (.env) tayyar karen:**
Ek `.env` file banayein aur ye line chipka den:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/gql_core?schema=public"

```


3. **Docker ka Jadoo:**
Database ko zinda (containerize) karne ke liye:
```bash
docker-compose up -d

```


4. **Database ko "Migrate" karen:**
Prisma ko batayein ke schema kaisa dikhta hai:
```bash
npx prisma migrate dev --name init

```



---

## 🚦 Let's Go! (Running the Project)

Ab engine start karne ka waqt hai:

```bash
npm run dev

```

Ab browser kholen aur check karen:
👉 `http://localhost:4000/graphql`

Wahan aap ye query chala sakte hain:

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
│   └── schema.prisma   # Database ka naksha 🗺️
├── src/
│   ├── index.ts        # Dil (The Apollo Server) ❤️
├── prisma.config.ts    # Prisma 7 ki nayi settings ⚙️
├── docker-compose.yaml # Database ka ghar 🏠
└── .env                # Top Secrets! 🤫

```

---

## 🎨 Funky Features

* **Prisma 7 Ready:** Humne purana style chora aur latest `adapter-pg` use kiya hai! 💅
* **Type Safe:** Bug dhoondne ki zaroorat nahi, TypeScript khud hi rok leta hai. 🛡️
* **Hot Reload:** `tsx` use kar rahe hain, code change karo aur foran result dekho! 🔥

---

## 🤝 Contribution

Aapko lagta hai ke isay aur funky banaya ja sakta hai? PR (Pull Request) bhej den, mil kar revolutionize karenge! 🤘

---

**Made with ❤️ and too much ☕ by [Your Name]**

