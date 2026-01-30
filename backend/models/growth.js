/**
 * Growth model — abonnés, tendances
 */

/** @param {import('better-sqlite3').Database} db */
export function initGrowth(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT NOT NULL,
      value INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS kpis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL,
      net REAL,
      new_subs INTEGER,
      active_subs INTEGER,
      arpu REAL,
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

/** @param {import('better-sqlite3').Database} db */
export function getSubscribers(db, limit = 12) {
  const stmt = db.prepare(`
    SELECT month as m, value as v FROM subscribers
    ORDER BY created_at DESC LIMIT ?
  `);
  return stmt.all(limit);
}

/** @param {import('better-sqlite3').Database} db */
export function getKpis(db) {
  const stmt = db.prepare(`
    SELECT total, net, new_subs, active_subs, arpu FROM kpis
    ORDER BY updated_at DESC LIMIT 1
  `);
  return stmt.get();
}
