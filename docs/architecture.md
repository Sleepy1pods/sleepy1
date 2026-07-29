# Sleepy1 — Architecture Overview

## Monorepo layout

```
sleepy1/
├── sleepy1-frontend/   # Vue 3 + Vite + TypeScript + Tailwind (this phase's deliverable)
├── sleepy1-backend/    # Spring Boot placeholder structure (future phase)
├── docs/               # Cross-cutting documentation (this file, api-contract.md)
└── README.md
```

The two apps are independent — the frontend does not import from or depend on the backend
folder in any way. It currently runs entirely on static TypeScript data modules and a mock
service layer designed to be swapped for real HTTP calls later.

## Frontend architecture

```
sleepy1-frontend/src/
├── assets/            Static illustration assets (SVG-based, no third-party imagery)
├── components/
│   ├── common/         Reusable, domain-agnostic UI (buttons, cards, modals, wallet UI...)
│   ├── home/            Home-page section components
│   ├── booking/         Multi-step booking flow components
│   ├── locations/        Location list/detail-specific components
│   └── layout/          Header, footer, mobile menu, announcement bar
├── views/              One component per route (see router/index.ts)
├── router/             Vue Router configuration + auth guards
├── stores/             Pinia stores (auth, bookingFlow, bookings, locations, credits, ui)
├── services/            Mock service layer — returns Promises, mimics a future HTTP client
├── data/                Static/mock data modules, typed against src/types
├── types/               Shared TypeScript interfaces
├── composables/         Reusable composition functions (scroll reveal, focus trap, etc.)
└── styles/              Tailwind entry + design tokens
```

### Data flow principle

Views never import raw mock arrays directly. The call chain is always:

```
View component → Pinia store (if shared/stateful) or Service function directly
                → Service function (src/services/*.ts)
                → Static data module (src/data/*.ts)
```

When a real backend exists, only the **service layer** needs to change (swap the mock
`delay()`-wrapped return for a `fetch()`/HTTP client call with the same return shape).
Stores, components, and views require no changes.

### State management

- `stores/auth.ts` — mock session (localStorage-backed), login/register/logout
- `stores/bookingFlow.ts` — in-progress multi-step booking wizard draft + live pricing
- `stores/bookings.ts` — the current user's booking list (upcoming/past)
- `stores/locations.ts` — location list, search, and city filter state
- `stores/credits.ts` — credit wallet balance, transactions, membership tier
- `stores/ui.ts` — mobile menu open/closed, toast notification queue

## Backend architecture (planned, not yet implemented)

See `sleepy1-backend/README.md` for the package breakdown and `docs/api-contract.md` for
the proposed REST surface. The intended pattern is a conventional layered Spring Boot app:

```
controller → service → repository → entity (JPA) → PostgreSQL
```

with a `security` package providing JWT-based authentication and a `dto` package
insulating the API contract from internal entity shape.

## Why a monorepo now

Keeping `sleepy1-backend` alongside the frontend from day one — even as an empty skeleton —
means:

1. The API contract can be designed against real frontend data shapes (see `src/types/`).
2. Adding the backend later is additive, not a restructuring exercise.
3. `docs/api-contract.md` acts as the shared source of truth both sides can reference.
