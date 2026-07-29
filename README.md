# Sleepy1

Premium private sleep, work, and rest pods for travellers at airports, railway stations,
metro stations, bus terminals, malls, business districts, corporate campuses, hospitals,
and pilgrimage centers.

This repository is a monorepo containing:

- **`sleepy1-frontend/`** — a complete, production-styled Vue 3 + TypeScript frontend
  (this phase's deliverable), running entirely on static mock data.
- **`sleepy1-backend/`** — a placeholder Spring Boot project structure for a future API
  (no business logic implemented yet).
- **`docs/`** — shared architecture notes and the proposed API contract between the two.

## Quick start (frontend)

```bash
cd sleepy1-frontend
npm install
cp .env.example .env.local   # optional — no env vars are required to run today
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

### Other frontend scripts

```bash
npm run build        # type-check (vue-tsc) + production build
npm run preview       # preview the production build locally
```

## Quick start (backend placeholder)

```bash
cd sleepy1-backend
mvn spring-boot:run
```

This boots an empty Spring Boot application with no exposed endpoints — see
`sleepy1-backend/README.md` for what exists and what's intentionally deferred.

## What's real vs. mock in this phase

Everything in `sleepy1-frontend` is fully interactive — routing, forms, the multi-step
booking flow, credit wallet, membership tiers, mock authentication — but all data is
static/in-memory (see `sleepy1-frontend/src/data/` and `sleepy1-frontend/src/services/`).
No real backend, database, payment gateway, or authentication provider is connected.
Payments, OTP codes, and invoices are explicitly labelled as simulated throughout the UI.

## Repository layout

```
sleepy1/
├── sleepy1-frontend/    Vue 3 + Vite + TypeScript + Tailwind + Pinia + Vue Router
├── sleepy1-backend/     Spring Boot placeholder (structure only)
├── docs/
│   ├── architecture.md   Cross-cutting architecture overview
│   └── api-contract.md   Proposed REST endpoints for the future backend
└── README.md            This file
```

See `sleepy1-frontend/ASSET_REQUIREMENTS.md` for the list of production photography/video
assets needed before a real launch (this build uses original SVG illustrations only —
no Napyork or third-party imagery).
