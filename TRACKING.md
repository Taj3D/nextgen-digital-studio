# Server-Side Tracking System — Conversions API (CAPI)

This system sends customer events (orders, returns, cancellations, deliveries, leads) directly from the server to all major marketing pixels — **Google, Facebook, TikTok, Snapchat**. It bypasses ad blockers and browser privacy restrictions, giving you more reliable conversion data than browser pixels alone.

## How it works

```
Customer action (order, return, cancel, delivery)
        ↓
POST /api/track  (from your store/webhook/server)
        ↓
trackEvent() in src/lib/tracking.ts
        ↓
   ┌────┴────┬─────────┬──────────┐
   ↓         ↓         ↓          ↓
Facebook  TikTok    Snapchat    Google
CAPI      Events    CAPI        GA4 MP
   ↓         ↓         ↓          ↓
   └────┬────┴─────────┴──────────┘
        ↓
  TrackingEvent table (SQLite) — full audit log
```

## Quick start

### 1. Configure platform credentials

Add to `.env`:

```env
# Facebook Conversions API
FB_PIXEL_ID=123456789012345
FB_CONVERSIONS_TOKEN=EAAG...your_token...

# TikTok Events API
TIKTOK_PIXEL_ID=C8K9XXXXXXXXXXXX
TIKTOK_ACCESS_TOKEN=xxxx_your_token

# Snapchat Conversions API
SNAP_PIXEL_ID=00000000-0000-0000-0000-000000000000
SNAP_CAPI_TOKEN=your_snap_token

# Google Analytics 4 Measurement Protocol
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_api_secret
```

Platforms without credentials are silently skipped — you can configure one or all.

### 2. Fire events

**From your order webhook / e-commerce backend:**

```bash
curl -X POST https://your-site.com/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "purchase",
    "eventId": "ORDER-2025-001",
    "email": "customer@example.com",
    "phone": "+8801700000000",
    "currency": "BDT",
    "value": 2500,
    "orderId": "ORDER-2025-001",
    "contentType": "order",
    "contents": [
      {"id": "SKU-RED-SHIRT", "quantity": 2, "price": 1000},
      {"id": "SKU-BLUE-CAP", "quantity": 1, "price": 500}
    ],
    "source": "webhook"
  }'
```

**Supported event types:**

| Event | When to fire |
|-------|-------------|
| `purchase` | Order completed / payment received |
| `refund` | Order returned / refunded |
| `cancel` | Order cancelled |
| `delivery` | Product delivered |
| `lead` | Lead captured (form, chat, etc.) |
| `view_content` | Product page viewed |
| `add_to_cart` | Item added to cart |
| `initiate_checkout` | Checkout started |
| `complete_registration` | Account created |
| `search` | User searched |
| `contact` | Contact form submitted |
| `booking` | Strategy call booked |
| `newsletter_signup` | Newsletter subscribed |
| *(custom)* | Any string event name |

### 3. View tracking data

**Admin stats:**
```bash
curl https://your-site.com/api/track/stats
```

Returns: total events, last 24h count, by-event breakdown, total purchase value, configured platforms, recent 50 events.

## Integration examples

### From a booking modal (client-side)

```typescript
// After successful booking
await fetch("/api/track", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    eventName: "booking",
    eventId: bookingId,
    email: customerEmail,
    phone: customerPhone,
    value: 0,
    currency: "BDT",
    contentType: "service",
    source: "client",
  }),
});
```

### From an order webhook (server-side)

```typescript
import { trackEvent } from "@/lib/tracking";

// When order status changes to "delivered"
await trackEvent({
  eventName: "delivery",
  eventId: order.id,
  email: order.customerEmail,
  phone: order.customerPhone,
  orderId: order.id,
  value: order.total,
  currency: order.currency,
  contentType: "delivery",
  contents: order.items.map(i => ({ id: i.sku, quantity: i.qty, price: i.price })),
  source: "webhook",
});
```

### From a return/cancel flow

```typescript
// Order cancelled
await trackEvent({
  eventName: "cancel",
  eventId: order.id,
  email: order.customerEmail,
  orderId: order.id,
  value: order.total,
  currency: order.currency,
  contentType: "cancel",
  source: "server",
});

// Order refunded
await trackEvent({
  eventName: "refund",
  eventId: refund.id,
  email: order.customerEmail,
  orderId: order.id,
  value: refund.amount,
  currency: "BDT",
  contentType: "return",
  source: "server",
});
```

## Privacy

- **Email and phone are SHA-256 hashed** before being sent to any platform or stored in the database.
- Raw PII never leaves the server boundary unhashed.
- Client IP and User-Agent are passed to platforms (needed for matching) but not stored in raw form.
- The `TrackingEvent` table stores only hashes — safe for analytics.

## Platform setup guides

### Facebook Conversions API
1. Go to Meta Events Manager → your Pixel → Settings
2. Scroll to "Conversions API" → "Set up manually"
3. Generate an access token
4. Copy your Pixel ID + access token to `.env`

### TikTok Events API
1. Go to TikTok Ads Manager → Events → Web Events
2. Set up Events API
3. Copy Pixel Code + Access Token to `.env`

### Snapchat Conversions API
1. Go to Snap Ads Manager → Events Manager
2. Set up Conversions API
3. Copy Pixel ID + CAPI Token to `.env`

### Google Analytics 4 Measurement Protocol
1. Go to GA4 Admin → Data Streams → your web stream
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Create a Measurement Protocol API Secret
4. Copy both to `.env`

## API reference

### `POST /api/track`

**Request body:**
```typescript
{
  eventName: string;           // required
  eventId?: string;            // deduplication id
  source?: "server" | "client" | "webhook";
  email?: string;              // hashed before sending
  phone?: string;              // hashed before sending
  currency?: string;           // BDT, USD, etc.
  value?: number;
  orderId?: string;
  contentType?: "order" | "return" | "cancel" | "delivery" | "product" | "service";
  contents?: Array<{ id: string; quantity: number; price?: number }>;
  numItems?: number;
  pageUrl?: string;
  referrer?: string;
  logOnly?: boolean;           // skip platforms, just log to DB
}
```

**Response:**
```json
{
  "ok": true,
  "eventId": "cmr4lhdxv0000spu35ho2s0wf",
  "results": [
    {"platform": "facebook", "status": "ok"},
    {"platform": "tiktok", "status": "skipped", "detail": "not configured"},
    {"platform": "snapchat", "status": "ok"},
    {"platform": "google", "status": "ok"}
  ]
}
```

### `GET /api/track/stats`

Returns tracking stats + recent events + configured platforms.
