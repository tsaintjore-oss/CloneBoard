# Stripe Setup — Products & Checkout

Products and prices are created via script. Both plans are **subscriptions** (Stripe Checkout, mode `subscription`).

## Products

| Product        | Price    | Billing        | Stripe type   |
|----------------|----------|----------------|---------------|
| Monthly access | €39.99   | Per month      | Recurring     |
| Yearly access  | €149.99  | Per year       | Recurring     |

---

## 1. Create Stripe account and get key

1. Sign up at https://stripe.com
2. Get your **Secret key** (test: `sk_test_...`) from https://dashboard.stripe.com/apikeys
3. In the project root, copy `.env.example` to `.env` and set:

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
```

---

## 2. Create products and prices (script)

From the project root, run:

```bash
npm run setup-stripe
```

Or directly: `node scripts/setup-stripe.js`

This will:

- Create product **Monthly access** and a recurring price €39.99/month
- Create product **Yearly access** and a recurring price €149.99/year
- Print the two **Price IDs** (e.g. `price_xxx`, `price_yyy`)

Add them to `.env`:

```env
STRIPE_PRICE_MONTHLY=price_xxxxxxxxxxxx
STRIPE_PRICE_YEARLY=price_xxxxxxxxxxxx
```

Restart the backend after updating `.env`.

---

## 3. Webhook (for production / renewals)

For **local testing**, access can be granted right after checkout via `verify-session`; the webhook is optional.

For **production** and to handle **renewals and cancellations**:

1. Go to https://dashboard.stripe.com/webhooks → Add endpoint
2. URL: `https://yourdomain.com/api/webhook/stripe-webhook`
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Signing secret** (`whsec_...`) into `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
```

---

## 4. Test the flow

1. Start backend: `npm run server`
2. Start frontend: `npm run dev`
3. Open http://localhost:5173/sales.html
4. Click **Get access** (Monthly or Annual), enter email, complete Stripe Checkout
5. Use test card: `4242 4242 4242 4242` (any future expiry, any CVC)
6. You should be redirected to success → access page with access granted

---

## 5. Test cards (Stripe)

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- More: https://stripe.com/docs/testing

---

## 6. Production checklist

- [ ] Use live keys (`sk_live_...`) and live price IDs
- [ ] Set `BASE_URL` and `STRIPE_WEBHOOK_SECRET` for your domain
- [ ] Test a real payment (small amount) and a subscription renewal
- [ ] Optional: Stripe Customer Portal for managing/cancelling subscriptions

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| "STRIPE_SECRET_KEY not set" | `.env` in project root, key starts with `sk_` |
| "Invalid price" / No such price | Run `node scripts/setup-stripe.js` and use the printed Price IDs in `.env` |
| Access not granted after payment | Backend logs; if using webhook, check Stripe Dashboard → Webhooks → event logs |
| Webhook signature failed | Correct `STRIPE_WEBHOOK_SECRET` for the endpoint (e.g. `whsec_...`) |
