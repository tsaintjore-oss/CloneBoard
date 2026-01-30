/**
 * Transactions model — historique des transactions
 */

/** @param {import('better-sqlite3').Database} db */
export function initTransactions(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      user TEXT NOT NULL,
      amount REAL NOT NULL,
      net REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

/** @param {import('better-sqlite3').Database} db */
export function getTransactions(db, limit = 50) {
  const stmt = db.prepare(`
    SELECT date, type, user, amount, net FROM transactions
    ORDER BY created_at DESC LIMIT ?
  `);
  return stmt.all(limit);
}

/** @param {import('better-sqlite3').Database} db */
export function createTransaction(db, { date, type, user, amount, net }) {
  const stmt = db.prepare(`
    INSERT INTO transactions (date, type, user, amount, net) VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(date, type, user, amount, net);
}
