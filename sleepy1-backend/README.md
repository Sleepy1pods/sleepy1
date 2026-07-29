# Sleepy1 Backend (Placeholder)

This module is an **initial project structure only**. It contains no business logic,
database connectivity, authentication, or payment integration. It exists so the
`sleepy1-frontend` app — currently powered entirely by static mock data and a mock
service layer (`src/services/*.ts`) — can be wired to a real API later without any
restructuring on either side.

## What exists today

- A bootable Spring Boot 3 / Java 21 skeleton (`Sleepy1Application.java`)
- Empty, documented packages under `com.sleepy1` matching the intended module boundaries
- A placeholder `application.yml` (no real credentials or database)
- An empty Flyway `db/migration` directory
- A single smoke test confirming the app context loads

## What does NOT exist yet (by design)

- No controllers, entities, repositories, or services with real logic
- No database schema or migrations
- No authentication/authorization (JWT, sessions, password hashing)
- No payment gateway integration
- No CORS/security configuration exposing this to the frontend

## Intended module breakdown

| Package | Responsibility |
|---|---|
| `config` | CORS, OpenAPI, Flyway, and other Spring configuration beans |
| `controller` | REST endpoints — see `../docs/api-contract.md` for the proposed contract |
| `dto` | Request/response payloads |
| `entity` | JPA entities mirroring the frontend's mock domain (`User`, `Location`, `Pod`, `Booking`, `CreditWallet`, `MembershipTier`, `Coupon`, etc.) |
| `repository` | Spring Data JPA repositories |
| `service` | Business logic — pricing, availability, credit ledger, booking lifecycle |
| `security` | Authentication/authorization — will replace the frontend's mock `authService.ts` |
| `exception` | Centralised error handling (`@ControllerAdvice`) |

## Suggested future backend modules

Authentication · Users · Airports/Locations · Terminals · Pod Inventory · Pod Availability ·
Bookings · Pricing · Payments · Coupons · Notifications · Reviews · Support · Admin

## Suggested authentication approach

JWT-based stateless authentication issued by a `/api/auth/login` endpoint, validated by a
Spring Security filter chain in `security/`. The frontend's current `localStorage`-based
mock session (see `sleepy1-frontend/src/services/authService.ts`) should be replaced with
real token storage and refresh handling once this exists.

## Suggested payment integration boundary

A dedicated `service/PaymentService` (or a gateway adapter interface) should own all
communication with a real payment provider (e.g. Razorpay/Stripe), exposed to the frontend
only via `POST /api/payments/create-order` and `POST /api/payments/verify` (see
`../docs/api-contract.md`). No payment provider SDK is included in this placeholder.

## Running (once implemented)

```bash
cd sleepy1-backend
mvn spring-boot:run
```

There is nothing meaningful to run yet beyond confirming the app boots — no endpoints are
exposed.
