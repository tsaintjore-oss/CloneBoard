/**
 * Script : seed db.sqlite (données dashboard)
 * Usage : npm run seed
 */

import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as earnings from "./models/earnings.js";
import * as transactions from "./models/transactions.js";
import * as growth from "./models/growth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "db.sqlite");
const db = new Database(dbPath);

earnings.initEarnings(db);
transactions.initTransactions(db);
growth.initGrowth(db);

const run = db.transaction(() => {
  db.exec("DELETE FROM earnings_daily; DELETE FROM earnings_trends; DELETE FROM earnings_summary; DELETE FROM kpi_changes;");
  db.exec("DELETE FROM transactions;");
  db.exec("DELETE FROM subscribers; DELETE FROM kpis;");

  const insDaily = db.prepare("INSERT INTO earnings_daily (day, value, growth) VALUES (?, ?, ?)");
  const daily = [
    ["Oct 1", 28472, 12.5], ["Oct 3", 22083, -22.4], ["Oct 5", 18891, -14.5],
    ["Oct 7", 24067, 27.4], ["Oct 9", 26794, 11.2], ["Oct 11", 19187, -28.3],
    ["Oct 13", 25291, 31.8], ["Oct 15", 27863, 10.2], ["Oct 17", 24271, -12.9],
    ["Oct 18", 13660.76, -43.91], ["Oct 20", 22094, 61.7], ["Oct 22", 26782, 21.2],
    ["Oct 24", 24483, -8.6], ["Oct 26", 27191, 11], ["Oct 28", 28847, 6.3],
    ["Oct 31", 29368, 1.7],
  ];
  for (const row of daily) insDaily.run(...row);

  const insTrend = db.prepare("INSERT INTO earnings_trends (day, value) VALUES (?, ?)");
  const trends = [
    ["Jul 11", 420], ["Jul 12", 380], ["Jul 13", 510], ["Jul 14", 290],
    ["Jul 15", 640], ["Jul 16", 720], ["Jul 17", 580], ["Jul 18", 890],
    ["Jul 19", 940], ["Jul 20", 820], ["Jul 21", 760], ["Jul 22", 650],
    ["Jul 23", 920], ["Jul 24", 880], ["Jul 25", 780], ["Jul 26", 950],
  ];
  for (const [d, v] of trends) insTrend.run(d, v);

  db.prepare("INSERT INTO earnings_summary (total, subscriptions, tips, posts, referrals, messages, streams) VALUES (8272.42, 534.48, 440, 0, 0, 7297.94, 0)").run();
  db.prepare("INSERT INTO kpi_changes (total, net, new_subs, active_subs, arpu) VALUES (12.2, 11.6, 8.1, -2.1, 5.2)").run();

  const insSub = db.prepare("INSERT INTO subscribers (month, value) VALUES (?, ?)");
  const subs = [["Jan", 14200], ["Feb", 14847], ["Mar", 15520], ["Apr", 16103], ["May", 16892], ["Jun", 17198], ["Jul", 17651], ["Aug", 17918], ["Sep", 18104], ["Oct", 18387]];
  for (const [m, v] of subs) insSub.run(m, v);

  db.prepare("INSERT INTO kpis (total, net, new_subs, active_subs, arpu) VALUES (672341.82, 603891.47, 2843, 18387, 36.42)").run();

  const insTx = db.prepare("INSERT INTO transactions (date, type, user, amount, net) VALUES (?, ?, ?, ?, ?)");
  const txs = [
    ["2025-10-31 16:12", "Tip", "user_9***2", 25, 21.23],
    ["2025-10-31 14:08", "Subscription", "j***k", 9.99, 7.49],
    ["2025-10-31 11:44", "Message", "m***7", 15, 12.81],
    ["2025-10-30 21:22", "PPV", "a***n", 12.99, 10.37],
    ["2025-10-30 18:15", "Tip", "b***1", 50, 42.48],
    ["2025-10-30 15:01", "Post", "—", 0, 0],
    ["2025-10-30 13:33", "Referral", "—", 4.99, 4.99],
    ["2025-10-29 20:50", "Subscription", "c***w", 14.99, 11.21],
    ["2025-10-29 17:12", "Tip", "d***4", 10, 8.49],
    ["2025-10-29 10:08", "Message", "e***l", 5.99, 5.07],
  ];
  for (const r of txs) insTx.run(...r);
});

run();
db.close();
console.log("Seed done: backend/db.sqlite");
