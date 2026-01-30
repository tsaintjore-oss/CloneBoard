/**
 * Settings controller — config globale (placeholder)
 */

export function getSettings(req, res) {
  res.json({
    dateRange: 'oct',
    shownBy: 'day',
    earningsType: 'net',
  });
}

export function updateSettings(req, res) {
  const { dateRange, shownBy, earningsType } = req.body;
  res.json({
    dateRange: dateRange || 'oct',
    shownBy: shownBy || 'day',
    earningsType: earningsType || 'net',
  });
}
