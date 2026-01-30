import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "data.json");

const DEFAULT_TOTAL = 8272.42;

export function loadTotals() {
  if (existsSync(DATA_PATH)) {
    try {
      const raw = readFileSync(DATA_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        totalEarnings7d: parsed.totalEarnings7d != null ? Number(parsed.totalEarnings7d) : DEFAULT_TOTAL,
        totalEarnings30d: parsed.totalEarnings30d != null ? Number(parsed.totalEarnings30d) : DEFAULT_TOTAL,
        totalEarnings90d: parsed.totalEarnings90d != null ? Number(parsed.totalEarnings90d) : DEFAULT_TOTAL,
      };
    } catch {
      return defaultTotals();
    }
  }
  return defaultTotals();
}

function defaultTotals() {
  return {
    totalEarnings7d: DEFAULT_TOTAL,
    totalEarnings30d: DEFAULT_TOTAL,
    totalEarnings90d: DEFAULT_TOTAL,
  };
}

/**
 * Save only totalEarnings per period. Accepts partial updates.
 * @param {{ totalEarnings7d?: number, totalEarnings30d?: number, totalEarnings90d?: number }} obj
 */
export function saveTotals(obj) {
  const current = loadTotals();
  const out = {
    totalEarnings7d: obj.totalEarnings7d != null ? Number(obj.totalEarnings7d) : current.totalEarnings7d,
    totalEarnings30d: obj.totalEarnings30d != null ? Number(obj.totalEarnings30d) : current.totalEarnings30d,
    totalEarnings90d: obj.totalEarnings90d != null ? Number(obj.totalEarnings90d) : current.totalEarnings90d,
  };
  writeFileSync(DATA_PATH, JSON.stringify(out, null, 2), "utf-8");
  return out;
}
