import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // Agar DATABASE_URL na mile to empty string use kare
    url: process.env.DATABASE_URL ?? "", 
  },
})