/**
 * Gestion des utilisateurs - PostgreSQL uniquement (pour Render)
 */

import { query } from "./db.js";

export const createUser = async (email, stripeCustomerId = null) => {
  try {
    const result = await query(
      "INSERT INTO users (email, stripe_customer_id) VALUES ($1, $2) RETURNING id",
      [email, stripeCustomerId]
    );
    return result.rows[0].id;
  } catch (error) {
    if (error.code === "23505") {
      const user = await getUserByEmail(email);
      if (user) return user.id;
    }
    throw error;
  }
};

export const createUserWithPassword = async (email, passwordHash) => {
  try {
    const result = await query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
      [email, passwordHash]
    );
    return result.rows[0].id;
  } catch (error) {
    if (error.code === "23505") {
      const user = await getUserByEmail(email);
      if (user) return user.id;
    }
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
};

export const getUserById = async (id) => {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const updateUserSubscription = async (
  email,
  subscriptionType,
  subscriptionStatus,
  subscriptionEndDate
) => {
  await query(
    `UPDATE users 
     SET subscription_type = $1, subscription_status = $2, subscription_end_date = $3, updated_at = NOW()
     WHERE email = $4`,
    [subscriptionType, subscriptionStatus, subscriptionEndDate, email]
  );
};

export const updateUserStripeCustomerId = async (email, stripeCustomerId) => {
  await query(
    "UPDATE users SET stripe_customer_id = $1, updated_at = NOW() WHERE email = $2",
    [stripeCustomerId, email]
  );
};

export const hasActiveSubscription = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) return false;
  if (user.subscription_status !== "active") return false;
  if (user.subscription_end_date) {
    return new Date(user.subscription_end_date) > new Date();
  }
  return true;
};

export const createPayment = async (userId, paymentIntentId, amount, status) => {
  await query(
    "INSERT INTO payments (user_id, stripe_payment_intent_id, amount, status) VALUES ($1, $2, $3, $4)",
    [userId, paymentIntentId, amount, status]
  );
};
