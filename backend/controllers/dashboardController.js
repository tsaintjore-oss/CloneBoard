import { loadTotals } from "../dataStore.js";
import {
  getOverview as deriveOverview,
  getEarningsOverTime,
  getSubscriberGrowth,
  getTransactions,
  PERIODS,
} from "../services/derivedData.js";

function parsePeriod(q) {
  const p = q ? parseInt(String(q), 10) : NaN;
  return PERIODS[p] ? p : 30;
}

export function getOverview(req, res) {
  const period = parsePeriod(req.query?.period);
  const totals = loadTotals();
  res.json(deriveOverview(period, totals));
}

export function getEarningsChart(req, res) {
  const period = parsePeriod(req.query?.period);
  const totals = loadTotals();
  res.json(getEarningsOverTime(period, totals));
}

export function getSubscriberGrowthHandler(req, res) {
  const period = parsePeriod(req.query?.period);
  const totals = loadTotals();
  res.json(getSubscriberGrowth(period, totals));
}

export function getTransactionsHandler(req, res) {
  const period = parsePeriod(req.query?.period);
  const totals = loadTotals();
  res.json(getTransactions(period, totals));
}
