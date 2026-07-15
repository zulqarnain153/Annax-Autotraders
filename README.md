# Annax Auto Traders

A premium used-car dealership website for **Annax Auto Traders** (Staines-upon-Thames), built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Design System

- **Colours:** Navy (`#0B1428`) · Ignition Orange (`#FF4612`) · Plate Yellow (`#FFD204`)
- **Typography:** Barlow Condensed (display) + Inter (body)
- **Signature motif:** a real UK number-plate badge used for prices, status tags, and the registration search field
- **Vehicle imagery:** illustrated showroom-spotlight silhouettes (see "Adding Real Photos" below) — no broken hotlinked stock photos

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and add your Web3Forms key:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
```

Get a free key at [web3forms.com](https://web3forms.com) — no backend needed, it emails form submissions
straight to your inbox. All forms (contact, finance application, test drive booking, reservation,
sell/part-exchange valuation) already post to this endpoint via `src/lib/business.ts`.

If you don't set the env var, the site falls back to the placeholder in `business.ts` — **forms will not
send until you add a real key.**

## Business Details

Every dealership-specific detail (address, phone, hours, socials, finance APR, SEO copy) lives in one file:

```
src/lib/business.ts
```

Update this file only — never hardcode business details inside components.

## Adding Real Vehicle Photos

Vehicles currently render as illustrated silhouettes (`VehicleSilhouette` component) instead of stock
photography, since no real photos of your cousin's stock exist yet and hotlinked stock photos break in
production. To switch to real photos:

1. Add photos to `public/vehicles/<slug>/1.jpg`, `2.jpg`, etc.
2. Update `src/lib/vehicles.ts` — add an `images: string[]` array per vehicle.
3. In `VehicleCard.tsx` and `VehicleGallery.tsx`, swap `<VehicleSilhouette />` for `next/image` pointing at
   `vehicle.images[i]`, keeping the same aspect-ratio wrapper.

## Stock Data

Vehicles, reviews, and news articles are mock data in `src/lib/vehicles.ts`. Replace with a real data
source (headless CMS, Google Sheet, or a database) when ready — the type shapes are in `src/lib/types.ts`.

## APIs Deliberately Left as Placeholders

Two features need a real (paid or key-gated) API that wasn't available at build time:

- **Registration lookup** (`ValuationForm.tsx`, Hero search): needs the DVLA Vehicle Enquiry Service API.
- **Instant part-exchange valuation**: needs a market-data provider (e.g. CAP HPI, Auto Trader Valuations API).

Both currently collect the details and forward them to your team via the contact form instead of an
automated instant quote — fully functional, just not automated.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add the `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` environment variable in Vercel's project settings.
4. Deploy.
5. **Turn off Vercel Deployment Protection** (Vercel Authentication) before sharing the preview link with
   your cousin — Settings → Deployment Protection → Off.
6. Once approved, connect `annaxautotraders.co.uk` in Settings → Domains.

## Project Structure

See the full tree in the project delivery message. Key folders:

```
src/app/            Next.js App Router pages (one folder per route)
src/components/     layout/ ui/ home/ vehicles/ — grouped by purpose
src/lib/            business.ts, types.ts, vehicles.ts (mock data), utils.ts
src/hooks/          wishlist, compare, dark mode, recently viewed
```
