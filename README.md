# Multi Event

Multi Event is a Next.js site for Bodrum event planning, live music, and production services. Content is stored in Supabase PostgreSQL through Prisma; the Sanity Studio has been removed.

## Local setup

1. Copy `.env.example` to `.env.local` and fill in the Supabase transaction-pooler `DATABASE_URL`, direct `DIRECT_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, and `NEXT_PUBLIC_SITE_URL`.
2. Create a public Vercel Blob store and add its `BLOB_READ_WRITE_TOKEN` to `.env.local` (or the Vercel project environment variables).
3. Install dependencies with `pnpm install`.
4. Generate Prisma Client with `pnpm prisma:generate`.
5. Apply the schema with `pnpm prisma migrate dev --name init` (or `pnpm prisma migrate deploy` in production).
6. Load the editable default services with `pnpm prisma:seed`.
7. Run the site with `pnpm dev`.

The admin panel uses one password from `ADMIN_PASSWORD`; there is no account creation or email login. A signed, HttpOnly session cookie lasts one year. Set a separate random `ADMIN_SESSION_SECRET` so changing the admin password does not reuse the signing key.

Artist images and event media are uploaded from the protected admin panel to Vercel Blob, while their content and ordering are stored in Prisma. Event entries support bilingual titles, descriptions and venues, an optional date, multiple photos/videos, draft publishing, drag-and-drop ordering, a public portfolio, and individual event pages.

To migrate the recovered Sanity artists after adding `BLOB_READ_WRITE_TOKEN`, run `pnpm sanity:import-artists`. Use `pnpm sanity:import-artists -- --dry-run` to validate the local export without writing anything.

## SEO and localization

Turkish and English pages are available under `/tr` and `/en`. Each language has localized home, services, artists, events, contact, and focused service landing pages with canonical and hreflang metadata. Published event pages are added to the generated `/sitemap.xml` automatically. Open Graph and WhatsApp previews reuse the square `public/logo.jpeg` logo.

Google Business Profile ownership, customer reviews, and external backlinks must be managed outside the repository.

## Verification

Use `pnpm exec tsc --noEmit` and `pnpm lint` for lightweight checks. The production build is `pnpm build`.
