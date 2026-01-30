import { loadTotals, saveTotals } from "../dataStore.js";

export function getAdminData(req, res) {
  try {
    res.json(loadTotals());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export function putAdminData(req, res) {
  try {
    const updated = saveTotals(req.body || {});
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
