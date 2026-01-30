/**
 * Configuration de la connexion à la base de données
 * Supporte PostgreSQL (Supabase) et SQLite (développement local)
 */

import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

let pool = null;

/**
 * Initialise la connexion à PostgreSQL
 */
export function initDatabase() {
  if (pool) {
    return pool;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn(
      "⚠️  DATABASE_URL non définie. Le backend ne pourra pas se connecter à la base de données."
    );
    console.warn(
      "   Pour le développement local avec SQLite, utilisez backend/db/users-sqlite.js"
    );
    return null;
  }

  try {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });

    // Test de connexion
    pool.query("SELECT NOW()", (err) => {
      if (err) {
        console.error("❌ Erreur de connexion à PostgreSQL:", err.message);
      } else {
        console.log("✅ Connexion à PostgreSQL établie");
      }
    });

    return pool;
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de PostgreSQL:", error);
    return null;
  }
}

/**
 * Obtient le pool de connexions
 */
export function getPool() {
  if (!pool) {
    return initDatabase();
  }
  return pool;
}

/**
 * Exécute une requête SQL
 */
export async function query(text, params) {
  const dbPool = getPool();
  if (!dbPool) {
    throw new Error("Base de données non initialisée. Vérifiez DATABASE_URL.");
  }
  return dbPool.query(text, params);
}

/**
 * Ferme la connexion (utile pour les tests)
 */
export async function close() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export default { initDatabase, getPool, query, close };
