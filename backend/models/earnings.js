/**
 * Earnings model — revenus, KPIs, creator summary
 */

export function initEarnings(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS earnings_daily (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      value REAL NOT NULL,
      growth REAL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS earnings_trends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      value REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS earnings_summary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL NOT NULL,
      subscriptions REAL NOT NULL DEFAULT 0,
      tips REAL NOT NULL DEFAULT 0,
      posts REAL NOT NULL DEFAULT 0,
      referrals REAL NOT NULL DEFAULT 0,
      messages REAL NOT NULL DEFAULT 0,
      streams REAL NOT NULL DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS kpi_changes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL,
      net REAL,
      new_subs REAL,
      active_subs REAL,
      arpu REAL,
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

export function getEarningsDaily(db, limit = 50) {
  const stmt = db.prepare(`
    SELECT day, value as v, growth FROM earnings_daily
    ORDER BY id ASC LIMIT ?
  `);
  return stmt.all(limit);
}

export function getEarningsSummary(db) {
  const stmt = db.prepare(`
    SELECT total, subscriptions, tips, posts, referrals, messages, streams
    FROM earnings_summary ORDER BY updated_at DESC LIMIT 1
  `);
  return stmt.get();
}

export function getKpiChanges(db) {
  const stmt = db.prepare(`
    SELECT total, net, new_subs, active_subs, arpu FROM kpi_changes
    ORDER BY updated_at DESC LIMIT 1
  `);
  return stmt.get();
}

export function getEarningsTrends(db, limit = 20) {
  const stmt = db.prepare(`
    SELECT day, value as v FROM earnings_trends
    ORDER BY id ASC LIMIT ?
  `);
  return stmt.all(limit);
}
