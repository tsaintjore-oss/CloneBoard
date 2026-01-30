/**
 * Creates Stripe products and prices for Cloneboard.
 * Run once after setting STRIPE_SECRET_KEY in .env:
 *   node scripts/setup-stripe.js
 *
 * Products:
 * 1. Monthly access — €39.99 / month (subscription)
 * 2. Yearly access — €149.99 / year (subscription)
 */

import "dotenv/config";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key || key.startsWith("sk_") === false) {
  console.error("Set STRIPE_SECRET_KEY in .env (e.g. sk_test_...)");
  process.exit(1);
}

const stripe = new Stripe(key);

async function main() {
  console.log("Creating Stripe products and prices...\n");

  // 1. Monthly access — €39.99 / month
  const monthlyProduct = await stripe.products.create({
    name: "Monthly access",
    description: "Monthly access to Cloneboard and InFlow dashboard",
  });

  const monthlyPrice = await stripe.prices.create({
    product: monthlyProduct.id,
    currency: "eur",
    unit_amount: 3999, // €39.99 in cents
    recurring: { interval: "month" },
  });

  console.log("Monthly access:");
  console.log("  Product ID:", monthlyProduct.id);
  console.log("  Price ID: ", monthlyPrice.id);
  console.log("  €39.99 / month (subscription)\n");

  // 2. Yearly access — €149.99 / year
  const yearlyProduct = await stripe.products.create({
    name: "Yearly access",
    description: "Annual access to Cloneboard and InFlow dashboard",
  });

  const yearlyPrice = await stripe.prices.create({
    product: yearlyProduct.id,
    currency: "eur",
    unit_amount: 14999, // €149.99 in cents
    recurring: { interval: "year" },
  });

  console.log("Yearly access:");
  console.log("  Product ID:", yearlyProduct.id);
  console.log("  Price ID: ", yearlyPrice.id);
  console.log("  €149.99 / year (subscription)\n");

  console.log("--- Add these to your .env ---\n");
  console.log("STRIPE_PRICE_MONTHLY=" + monthlyPrice.id);
  console.log("STRIPE_PRICE_YEARLY=" + yearlyPrice.id);
  console.log("\nThen restart your server.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
