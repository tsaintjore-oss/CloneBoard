import express from "express";
import Stripe from "stripe";
import {
  getUserByEmail,
  updateUserSubscription,
  createPayment,
} from "../db/users.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

router.post("/stripe-webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.payment_status === "paid") {
          const { email: rawEmail, plan } = session.metadata;
          const email = (rawEmail || "").trim().toLowerCase();
          const endDate = new Date();
          if (plan === "monthly") {
            endDate.setMonth(endDate.getMonth() + 1);
          } else {
            endDate.setFullYear(endDate.getFullYear() + 1);
          }
          updateUserSubscription(email, plan, "active", endDate.toISOString());
          const user = getUserByEmail(email);
          if (user && session.payment_intent) {
            try {
              const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
              createPayment(user.id, paymentIntent.id, paymentIntent.amount, paymentIntent.status);
            } catch (e) {
              console.warn("Could not record payment:", e.message);
            }
          }
          console.log(`✅ Access granted to ${email} for ${plan} plan`);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customer = await stripe.customers.retrieve(subscription.customer);
        const email = (customer.email || "").trim().toLowerCase();
        const plan = subscription.metadata?.plan || "monthly";
        const isActive = subscription.status === "active" || subscription.status === "trialing";
        if (isActive) {
          const endDate = new Date(subscription.current_period_end * 1000);
          updateUserSubscription(email, plan, "active", endDate.toISOString());
        } else {
          updateUserSubscription(email, null, "inactive", null);
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
