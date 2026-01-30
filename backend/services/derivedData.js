/**
 * Single source of truth: totalEarnings per period (7d, 30d, 90d).
 * All other values are derived deterministically. No random; stable output.
 */

const PERIODS = Object.freeze({ 7: 7, 30: 30, 90: 90 });

/** Percentages of total (sum = 1). Répartition crédible : tout scale avec le total. */
const PCT = Object.freeze({
  subscriptions: 0.15,
  tips: 0.12,
  posts: 0.04,
  messages: 0.55,
  referrals: 0.08,
  streams: 0.06,
});

const GROWTH_DEFAULT = 12.2;

/** Fixed date labels per period (stable, no regeneration). */
const LABELS_7 = ["Oct 25", "Oct 26", "Oct 27", "Oct 28", "Oct 29", "Oct 30", "Oct 31"];
const LABELS_30 = [
  "Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8", "Oct 9", "Oct 10",
  "Oct 11", "Oct 12", "Oct 13", "Oct 14", "Oct 15", "Oct 16", "Oct 17", "Oct 18", "Oct 19", "Oct 20",
  "Oct 21", "Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26", "Oct 27", "Oct 28", "Oct 29", "Oct 30",
];
const LABELS_90 = (() => {
  const out = [];
  const months = [
    ["Aug", 31], ["Sep", 30], ["Oct", 30],
  ];
  let i = 0;
  for (const [m, days] of months) {
    for (let d = 1; d <= days && i < 90; d++, i++) out.push(m + " " + d);
  }
  return out;
})();

function getLabels(n) {
  if (n === 7) return LABELS_7;
  if (n === 30) return LABELS_30;
  if (n === 90) return LABELS_90.slice(0, 90);
  return LABELS_30.slice(0, Math.min(30, n));
}

/** Deterministic weight for day i (no random). */
function weight(i, n) {
  const x = (i * 7) % 11;
  return 1 + 0.02 * (x - 5);
}

/** Round to 2 decimals, then fix sum to exactly total. */
function allocateDailyAmounts(total, n) {
  const w = [];
  let sumW = 0;
  for (let i = 0; i < n; i++) {
    const t = weight(i, n);
    w.push(t);
    sumW += t;
  }
  const amounts = w.map((t) => Math.round((total * (t / sumW)) * 100) / 100);
  let sum = amounts.reduce((a, b) => a + b, 0);
  const diff = Math.round((total - sum) * 100) / 100;
  if (diff !== 0 && amounts.length) {
    amounts[amounts.length - 1] = Math.round((amounts[amounts.length - 1] + diff) * 100) / 100;
  }
  return amounts;
}

/**
 * @param {7|30|90} period
 * @param {{ totalEarnings7d: number, totalEarnings30d: number, totalEarnings90d: number }} totals
 */
export function getOverview(period, totals) {
  const p = PERIODS[period] ? period : 30;
  const key = `totalEarnings${p}d`;
  const total = totals[key] != null ? Number(totals[key]) : 8272.42;

  const round2 = (x) => Math.round(x * 100) / 100;
  const subs = round2(total * PCT.subscriptions);
  const tips = round2(total * PCT.tips);
  const posts = round2(total * PCT.posts);
  const referrals = round2(total * PCT.referrals);
  const streams = round2(total * PCT.streams);
  const messages = round2(total - (subs + tips + posts + referrals + streams));

  return {
    totalEarnings: total,
    subscriptions: subs,
    tips,
    posts,
    messages,
    referrals,
    streams,
    growth: GROWTH_DEFAULT,
  };
}

/**
 * Earnings over time: N days, sum === total, deterministic.
 * @param {7|30|90} period
 * @param {{ totalEarnings7d, totalEarnings30d, totalEarnings90d }} totals
 */
export function getEarningsOverTime(period, totals) {
  const p = PERIODS[period] ? period : 30;
  const key = `totalEarnings${p}d`;
  const total = totals[key] != null ? Number(totals[key]) : 8272.42;
  const n = p;
  const labels = getLabels(n);
  const amounts = allocateDailyAmounts(total, n);
  return labels.slice(0, amounts.length).map((date, i) => ({
    date,
    amount: amounts[i],
  }));
}

/**
 * Subscriber growth: deterministic from total (stable).
 */
export function getSubscriberGrowth(period, totals) {
  const p = PERIODS[period] ? period : 30;
  const key = `totalEarnings${p}d`;
  const total = totals[key] != null ? Number(totals[key]) : 8272.42;
  const scale = Math.max(0, Math.floor(total / 500));
  const base = 14200;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  return months.map((month, i) => ({
    month,
    subs: base + scale * (i + 1) * 47,
  }));
}

/**
 * Transactions: deterministic sample from total (stable).
 */
export function getTransactions(period, totals) {
  const p = PERIODS[period] ? period : 30;
  const key = `totalEarnings${p}d`;
  const total = totals[key] != null ? Number(totals[key]) : 8272.42;
  const rows = [
    { type: "Tip", user: "user_9***2", pct: 0.003 },
    { type: "Subscription", user: "j***k", pct: 0.0012 },
    { type: "Message", user: "m***7", pct: 0.0018 },
    { type: "PPV", user: "a***n", pct: 0.0016 },
    { type: "Tip", user: "b***1", pct: 0.006 },
  ];
  const dates = ["31 Oct 2025, 16:12", "31 Oct 2025, 14:08", "31 Oct 2025, 11:44", "30 Oct 2025, 21:22", "30 Oct 2025, 18:15"];
  return rows.map((r, i) => {
    const amount = Math.round(r.pct * total * 100) / 100;
    const net = Math.round(amount * 0.85 * 100) / 100;
    return {
      date: dates[i],
      type: r.type,
      user: r.user,
      amount,
      net,
    };
  });
}

export { PERIODS };
