# Workshop Creative Group Website

A professional multi-page website for Workshop Creative Group — large format printing, graphic design, and print procurement services. Features an invoice upload quote comparison flow that saves clients up to 30% on printing costs.

## Tech Stack

- **Frontend:** React 19 + Vite + Tailwind CSS 4
- **Backend:** Express 4 + tRPC 11
- **Database:** MySQL / TiDB (via Drizzle ORM)
- **File Storage:** S3-compatible storage
- **Auth:** Manus OAuth

## Pages

- `/` — Home (hero, 2-step savings process, services, why choose us, industries)
- `/about` — About
- `/large-format-printing` — Large Format Printing
- `/graphic-design` — Graphic Design
- `/print-procurement` — Print Procurement
- `/blog` — Brent's Blog
- `/request-quote` — Request a Quote (invoice upload form)
- `/contact` — Contact

## Local Development

```bash
pnpm install
pnpm run dev
```

## Production Build

```bash
pnpm run build
pnpm start
```

## Railway Deployment

1. Connect this GitHub repo to a new Railway project
2. Set the following environment variables in Railway:
   - `DATABASE_URL` — MySQL connection string
   - `JWT_SECRET` — Random secret for session cookies
   - `PORT` — Set to `8080` (Railway default)
   - `NODE_ENV` — `production`
3. Railway will auto-detect the `Dockerfile` and build/deploy automatically

## Environment Variables

See the required environment variables listed in the Railway project settings. All Manus platform variables (OAuth, storage, analytics) are injected automatically when deployed via Manus.
