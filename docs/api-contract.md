# Sleepy1 — Proposed API Contract

This document sketches the REST API the frontend's mock service layer
(`sleepy1-frontend/src/services/*.ts`) is designed to be swapped onto. **None of these
endpoints exist yet** — this is a design reference for the backend team, matched against
the TypeScript types in `sleepy1-frontend/src/types/`.

All responses are wrapped in `{ data: ... }` for consistency; errors follow
`{ error: { code: string, message: string } }`.

---

## Locations

### `GET /api/locations`
Query params: `q` (search), `city`, `hubType`

```json
{
  "data": [
    {
      "id": "loc-bom",
      "slug": "mumbai-international-airport",
      "name": "Mumbai International Airport",
      "hubType": "airport",
      "city": "Mumbai",
      "podCount": 12,
      "availablePods": 7,
      "startingPricePerHour": 499,
      "geo": { "lat": 19.0896, "lng": 72.8656 }
    }
  ]
}
```

### `GET /api/locations/{slug}`
Full `Location` object — see `src/types/location.ts`.

### `GET /api/locations/{id}/availability?date=YYYY-MM-DD`

```json
{ "data": [{ "time": "10:00", "available": true }] }
```

---

## Pods

### `GET /api/pods`
Returns all `PodTypeDefinition` records — see `src/types/pod.ts`.

### `GET /api/pods/{id}`

---

## Bookings

### `POST /api/bookings`

Request body mirrors `BookingDraft` (`src/types/booking.ts`):

```json
{
  "locationId": "mumbai-international-airport",
  "podTypeId": "pod-solo-rest",
  "date": "2026-08-14",
  "checkIn": "10:00",
  "durationHours": 2,
  "extraIds": ["extra-eyemask"],
  "guest": { "fullName": "...", "email": "...", "phone": "..." },
  "couponCode": "FIRSTSLEEP",
  "paymentMethod": "hybrid",
  "creditsToApply": 300
}
```

Response: full `Booking` object including `reference`, `qrValue`, and computed `price`.

### `GET /api/bookings/me`
Returns the authenticated user's bookings (upcoming + past).

### `GET /api/bookings/{id}`

### `PATCH /api/bookings/{id}/cancel`
### `PATCH /api/bookings/{id}/reschedule`

```json
{ "date": "2026-08-20", "checkIn": "14:00" }
```

---

## Authentication

### `POST /api/auth/register`

```json
{ "fullName": "...", "email": "...", "phone": "...", "password": "..." }
```

### `POST /api/auth/login`

```json
{ "email": "...", "password": "..." }
```

Response: `{ "data": { "user": { ... }, "accessToken": "..." } }`

### `POST /api/auth/otp/request` / `POST /api/auth/otp/verify`
### `POST /api/auth/password/forgot` / `POST /api/auth/password/reset`

---

## Credits & Membership

### `GET /api/credits/wallet`
### `GET /api/credits/packages`
### `POST /api/credits/purchase`

```json
{ "packageId": "pack-500" }
```

### `POST /api/credits/redeem`

```json
{ "amount": 420, "bookingId": "bk-123" }
```

### `GET /api/membership/tiers`

---

## Payments (gateway-agnostic boundary)

### `POST /api/payments/create-order`

```json
{ "bookingId": "bk-123", "amount": 1254 }
```

Response: an opaque order/session payload from whichever gateway is integrated
(Razorpay/Stripe/etc.) — the frontend never talks to the gateway directly.

### `POST /api/payments/verify`

```json
{ "orderId": "...", "paymentId": "...", "signature": "..." }
```

---

## Notes for implementation

- Every list endpoint should support pagination (`page`, `pageSize`) once real data volume
  justifies it — the mock layer currently returns full arrays.
- `Booking.qrValue` should be generated server-side once real check-in hardware exists,
  rather than the current client-generated string.
- Coupon validation (`FIRSTSLEEP` etc.) is currently hardcoded in
  `stores/bookingFlow.ts` and must move server-side before launch.
