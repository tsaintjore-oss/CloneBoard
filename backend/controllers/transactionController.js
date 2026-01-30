/**
 * Transaction controller — liste et création
 */

import * as transactions from '../models/transactions.js';

const MONTH = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };

function normalizeDate(s) {
  if (!s || /^\d{4}-\d{2}-\d{2}\s/.test(s)) return s;
  const m = String(s).match(/^(\d+)\s+(\w{3})\s+(\d{4}),\s*(\d{1,2}:\d{2})$/);
  if (!m) return s;
  const mm = MONTH[m[2]];
  if (!mm) return s;
  const dd = m[1].padStart(2, '0');
  return `${m[3]}-${String(mm).padStart(2, '0')}-${dd} ${m[4]}`;
}

function formatTx(row) {
  return {
    date: normalizeDate(row.date),
    type: row.type,
    user: row.user,
    amount: Number(row.amount),
    net: Number(row.net),
  };
}

export function getTransactions(req, res, db) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
    const rows = transactions.getTransactions(db, limit);
    res.json(rows.map(formatTx));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export function createTransaction(req, res, db) {
  try {
    const { date, type, user, amount, net } = req.body;
    if (!date || type == null || !user || amount == null || net == null) {
      return res.status(400).json({ error: 'date, type, user, amount, net required' });
    }
    const r = transactions.createTransaction(db, { date, type, user, amount, net });
    res.status(201).json({ id: r.lastInsertRowid, ...formatTx({ date, type, user, amount, net }) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
