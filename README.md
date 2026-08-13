# geratebuch.de

Digitale Geräteakte & Serviceplattform für Kosmetik- und Lasergeräte in Deutschland — ein Service von EuroIPL.

Public marketing site + client portal + internal admin/catalog tool, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Prisma + SQLite.

## Stack

- **Next.js 16** (App Router, Server Actions, Turbopack)
- **Tailwind CSS v4**
- **Prisma 7** with Cloudflare D1

## Project structure

- `src/app/(site)` — public marketing site (services, company info, legal pages)
- `src/app/portal` — client portal (device registry, service requests, documents) — light theme
- `src/app/admin` — internal EuroIPL tool (device/technology catalog management, review queue) — dark theme
- `prisma/schema.prisma` — data model (technology catalog, manufacturers, device models, devices, service requests…)
- `prisma/seed.sql` — full technology taxonomy + demo tenant data

## Getting started

```bash
npm install
npm run db:migrate:local
npm run db:seed:local
npm run dev
```

The Next.js development server uses the local D1 database managed by Wrangler.

## Cloudflare Workers

```bash
npm run deploy
npm run db:migrate:remote
npm run db:seed:remote # initial deployment only
```

The Worker and D1 database are provisioned from `wrangler.jsonc`. Cloudflare's Git build should use `npm run deploy` on the `master` branch.

Open [http://localhost:3000](http://localhost:3000) for the public site, `/portal` for the client portal, and `/admin/katalog` for the internal catalog tool.

## Notes

- No authentication yet — `/portal` and `/admin` are both open. The portal always acts as the single seeded demo organization ("Kosmetikinstitut Lindenhof GmbH").
- Device/Typenschild photos are stored as base64 in SQLite — fine for a demo, would need real object storage at scale.
- Legal pages (Impressum, Datenschutz, AGB) contain clearly-marked placeholder data and need a legal review before going live.
