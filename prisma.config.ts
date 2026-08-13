import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Next.js loads .env.local automatically; Prisma CLI does not.
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Prisma CLI uses the direct Supabase connection for migrations.
    url: env("DIRECT_URL"),
  },
});
