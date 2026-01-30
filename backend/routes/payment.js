import express from "express";
import Stripe from "stripe";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserStripeCustomerId,
  updateUserSubscription,
  hasActiveSubscription,
} from "../db/users.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY not set. Stripe payments will not work.");
}

const PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || "price_monthly_placeholder",
  yearly: process.env.STRIPE_PRICE_YEARLY || "price_yearly_placeholder",
};

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { plan, email } = req.body;

    if (!plan || !["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await getUserByEmail(normalizedEmail);
    if (!user) {
      const userId = await createUser(normalizedEmail);
      user = await getUserById(userId);
    }

    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: normalizedEmail,
        metadata: { userId: user.id.toString() },
      });
      customerId = customer.id;
      if (process.env.DATABASE_URL) {
        await updateUserStripeCustomerId(normalizedEmail, customerId);
      } else {
        updateUserStripeCustomerId(normalizedEmail, customerId);
      }
    }

    const priceId = PRICES[plan];
    const baseUrl = process.env.BASE_URL || "http://localhost:5173";
    const successUrl = `${baseUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/sales.html#pricing`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      subscription_data: {
        metadata: { plan, email: normalizedEmail },
      },
      metadata: {
        userId: user.id.toString(),
        email: normalizedEmail,
        plan,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const isStripe = error.type && String(error.type).startsWith("Stripe");
    const message = isStripe
      ? "We couldn’t start checkout. Please try again or contact support."
      : (error.message || "Something went wrong. Please try again.");
    res.status(500).json({ error: message });
  }
});

router.get("/verify-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ error: "Session ID required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    const metadata = session.metadata || {};

    if (session.payment_status === "paid") {
      const email = metadata.email;
      const plan = metadata.plan;
      if (!email || !plan) {
        console.warn("Verify-session: missing metadata", session.id);
        return res.status(400).json({
          success: false,
          accessGranted: false,
          error: "Session could not be verified. Please log in with your email to access your account.",
        });
      }
      const endDate = new Date();
      if (plan === "monthly") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }
      if (process.env.DATABASE_URL) {
        await updateUserSubscription(email, plan, "active", endDate.toISOString());
      } else {
        updateUserSubscription(email, plan, "active", endDate.toISOString());
      }

      res.json({ success: true, email, plan, accessGranted: true });
    } else {
      res.json({
        success: false,
        accessGranted: false,
        error: "Payment not completed. If you just paid, wait a moment and refresh.",
      });
    }
  } catch (error) {
    console.error("Session verification error:", error);
    res.status(500).json({
      success: false,
      accessGranted: false,
      error: error.message || "Verification failed. Please try again or contact support.",
    });
  }
});

router.get("/check-access", async (req, res) => {
  try {
    const raw = req.query.email;
    if (!raw) {
      return res.status(400).json({ error: "Email required" });
    }
    const email = raw.trim().toLowerCase();
    const hasAccess = process.env.DATABASE_URL
      ? await hasActiveSubscription(email)
      : hasActiveSubscription(email);
    const user = process.env.DATABASE_URL
      ? await getUserByEmail(email)
      : getUserByEmail(email);
    res.json({
      hasAccess,
      subscriptionStatus: user?.subscription_status || "inactive",
      subscriptionType: user?.subscription_type || null,
      subscriptionEndDate: user?.subscription_end_date || null,
    });
  } catch (error) {
    console.error("Access check error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
