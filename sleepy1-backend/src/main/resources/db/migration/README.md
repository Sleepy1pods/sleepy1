# Database Migrations

This directory will hold Flyway migration scripts (e.g. `V1__init_schema.sql`) once the
backend's persistence layer is implemented. No migrations exist yet.

Suggested first migration scope (see `docs/architecture.md` for full entity list):

- `users`
- `locations` / `pods` / `pod_availability`
- `bookings` / `booking_extras`
- `credit_wallets` / `credit_transactions`
- `membership_tiers`
- `coupons`
