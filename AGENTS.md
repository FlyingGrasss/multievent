<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Project Rules

## Package Manager
This project uses **pnpm** exclusively. Never use `npm` or `yarn`.
- Install deps: `pnpm install`
- Run scripts: `pnpm dev`, `pnpm build`, `pnpm lint`
- Add packages: `pnpm add <pkg>`, `pnpm add -D <pkg>`
- Prisma: `pnpm prisma generate`, `pnpm prisma migrate dev`, `pnpm prisma migrate reset`

## Database & ORM (Prisma v7 Architecture)
- **Provider:** PostgreSQL (Supabase Frankfurt)
- **Prisma Configuration:** The database connection configuration lives strictly in `prisma.config.ts`, **NOT** in `schema.prisma` (deprecated).
- **CLI & Migrations:** `prisma.config.ts` is explicitly reserved for the **Direct URL** (`DIRECT_URL` on port 5432) so the CLI never hangs on migrations.
- **App Runtime & Connection Pooling:** To avoid hitting max connection limits on the serverless Vercel runtime, the application client must be initialized in a separate file (e.g., `lib/db.ts` or `lib/prisma.ts`). You **must** instantiate a standard `pg` Pool using the **Transaction Pooler URL** (`DATABASE_URL` on port 6543) and inject it into Prisma using the `@prisma/adapter-pg` driver adapter. Never merge this runtime configuration into `prisma.config.ts`.
- **Command References:**
  - Run migrations: `pnpm prisma migrate dev --name <description>`
  - Reset DB: `pnpm prisma migrate reset`

## Text Encoding and Turkish UI Copy
- Preserve files as UTF-8.
- Turkish UI text must use real Turkish characters (`ç`, `ğ`, `ı`, `İ`, `ö`, `ş`, `ü`) and must never be committed as mojibake or replacement characters.

## UI Safety and Editing
- Never use browser-native confirmation dialogs such as `window.confirm`.
- Destructive actions must use a custom in-app modal with a clear cancel action.
- Editing existing entries must happen in an in-place modal, not by navigating to a separate edit page.
- Never use a loading cursor such as `cursor-wait`; keep the normal cursor while actions are pending.

## Verification Discipline
- Keep verification lightweight and proportional to the change.
- Do not run `pnpm build` for routine checks unless explicitly requested or the change genuinely needs a production build.
- For syntax and TypeScript checks, prefer `pnpm exec tsc --noEmit`.
- Avoid running multiple redundant verification commands when one targeted verification command is enough.
- Do not use the in-app Browser or browser automation for routine local UI verification. The user will manually test visual/UI behavior unless they explicitly ask for browser-based verification.

## Git
- Do not run git commands unless the user explicitly asks for them.
- The user manages commits, pushes, and deploy-triggering changes through GitHub Desktop.
<!-- END:project-rules -->
