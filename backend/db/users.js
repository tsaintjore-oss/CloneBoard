/**
 * Gestion des utilisateurs
 * Utilise PostgreSQL si DATABASE_URL est définie, sinon SQLite (pour développement/local)
 */

import "dotenv/config";

let db = null;
let usePostgres = false;

// Détecter quelle base de données utiliser
if (process.env.DATABASE_URL) {
  // Utiliser PostgreSQL (Supabase) si DATABASE_URL est définie
  usePostgres = true;
  const { query } = await import("./db.js");
  
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
       SET subscription_type = $1, 
           subscription_status = $2, 
           subscription_end_date = $3,
           updated_at = NOW()
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
      const endDate = new Date(user.subscription_end_date);
      return endDate > new Date();
    }
    return true;
  };

  export const createPayment = async (userId, paymentIntentId, amount, status) => {
    await query(
      "INSERT INTO payments (user_id, stripe_payment_intent_id, amount, status) VALUES ($1, $2, $3, $4)",
      [userId, paymentIntentId, amount, status]
    );
  };

  export default null;
} else {
  // Utiliser SQLite (pour développement local ou Railway/Render)
  const Database = (await import("better-sqlite3")).default;
  const path = (await import("path")).default;
  const { fileURLToPath } = await import("url");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  db = new Database(path.join(__dirname, "../users.db"));

  // Initialize database
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      stripe_customer_id TEXT,
      subscription_type TEXT,
      subscription_status TEXT DEFAULT 'inactive',
      subscription_end_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      stripe_payment_intent_id TEXT UNIQUE,
      amount INTEGER,
      currency TEXT DEFAULT 'eur',
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  // Add password_hash column if table already existed without it
  try {
    db.exec("ALTER TABLE users ADD COLUMN password_hash TEXT");
  } catch (_) {}

  export const createUser = (email, stripeCustomerId = null) => {
    const stmt = db.prepare(
      "INSERT INTO users (email, stripe_customer_id) VALUES (?, ?)"
    );
    try {
      const result = stmt.run(email, stripeCustomerId);
      return result.lastInsertRowid;
    } catch (error) {
      const user = getUserByEmail(email);
      if (user) return user.id;
      throw error;
    }
  };

  export const createUserWithPassword = (email, passwordHash) => {
    const stmt = db.prepare(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)"
    );
    try {
      const result = stmt.run(email, passwordHash);
      return result.lastInsertRowid;
    } catch (error) {
      const user = getUserByEmail(email);
      if (user) return user.id;
      throw error;
    }
  };

  export const getUserByEmail = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
  };

  export const getUserById = (id) => {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id);
  };

  export const updateUserSubscription = (
    email,
    subscriptionType,
    subscriptionStatus,
    subscriptionEndDate
  ) => {
    const stmt = db.prepare(`
      UPDATE users 
      SET subscription_type = ?, 
          subscription_status = ?, 
          subscription_end_date = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE email = ?
    `);
    stmt.run(subscriptionType, subscriptionStatus, subscriptionEndDate, email);
  };

  export const updateUserStripeCustomerId = (email, stripeCustomerId) => {
    const stmt = db.prepare(
      "UPDATE users SET stripe_customer_id = ? WHERE email = ?"
    );
    stmt.run(stripeCustomerId, email);
  };

  export const hasActiveSubscription = (email) => {
    const user = getUserByEmail(email);
    if (!user) return false;
    if (user.subscription_status !== "active") return false;
    if (user.subscription_end_date) {
      const endDate = new Date(user.subscription_end_date);
      return endDate > new Date();
    }
    return true;
  };

  export const createPayment = (userId, paymentIntentId, amount, status) => {
    const stmt = db.prepare(
      "INSERT INTO payments (user_id, stripe_payment_intent_id, amount, status) VALUES (?, ?, ?, ?)"
    );
    stmt.run(userId, paymentIntentId, amount, status);
  };

  export default db;
}
