import { useRef } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { formatMoney, formatPercent } from '../utils/format'
import { exportToPng } from '../utils/export'

const EARNINGS_CONFIG = [
  { key: 'subscriptions', label: 'Abonnements', icon: '📋', imageUrl: '/logo-subscription.png', color: '#8b5cf6' },
  { key: 'posts', label: 'Publications', icon: '📝', color: '#06b6d4' },
  { key: 'messages', label: 'Messages', icon: '💬', color: '#22c55e' },
  { key: 'tips', label: 'Pourboires', icon: '💰', color: '#eab308' },
  { key: 'referrals', label: 'Parrainages', icon: '🔗', color: '#f97316' },
  { key: 'streams', label: 'Streams', icon: '📺', color: '#ec4899' },
]

export default function Dashboard({ data }) {
  const ref = useRef(null)

  const total = data.totalEarnings
  const earningsArray = EARNINGS_CONFIG.map(({ key, label, color }) => ({
    name: label,
    value: data.earnings[key] || 0,
    color,
  })).filter((e) => e.value > 0)

  const CustomBarTooltip = ({ active, payload }) => {
    if (!active || !payload?.[0]) return null
    const p = payload[0].payload
    return (
      <div className="bg-inflow-card border border-inflow-border rounded-lg shadow-xl px-4 py-3 text-sm">
        <div className="font-medium">{p.day}</div>
        <div>Gains: {formatMoney(p.earnings)}</div>
        <div>Croissance: {formatPercent(p.growth)}</div>
      </div>
    )
  }

  return (
    <div ref={ref} className="max-w-5xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1">
          <button className="px-4 py-2 rounded-t bg-inflow-card border border-inflow-border border-b-0 text-inflow-accent font-medium">
            Aperçu
          </button>
          <button className="px-4 py-2 rounded-t text-inflow-muted hover:text-white hover:bg-white/5">
            Performance créateur
          </button>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-inflow-muted text-sm">{data.period.start} — {data.period.end}</span>
          <span className="text-inflow-muted text-sm">Affiché par jour</span>
          <span className="text-inflow-muted text-sm">Revenus nets</span>
          <button className="text-sm text-inflow-muted hover:text-white border border-inflow-border rounded px-3 py-1.5">
            Filtres
          </button>
          <button
            onClick={() => exportToPng(ref.current, 'inflow-dashboard')}
            className="text-sm bg-inflow-accent hover:bg-inflow-accentHover text-white rounded px-3 py-1.5"
          >
            Exporter en PNG
          </button>
        </div>
      </div>

      <section className="bg-inflow-card rounded-xl border border-inflow-border p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Résumé des gains</h2>
        <p className="text-2xl font-bold text-inflow-accent mb-6">
          Gains totaux: {formatMoney(total)}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {EARNINGS_CONFIG.map(({ key, label, icon, imageUrl }) => (
            <div
              key={key}
              className="bg-inflow-dark/60 rounded-lg border border-inflow-border p-4"
            >
              <div className="text-xl mb-1">
                {imageUrl ? (
                  <img src={imageUrl} alt={label} className="w-6 h-6 object-contain" />
                ) : (
                  icon
                )}
              </div>
              <div className="text-inflow-muted text-sm">{label}</div>
              <div className="text-white font-semibold">{formatMoney(data.earnings[key] || 0)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-inflow-card rounded-xl border border-inflow-border p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Tendances des gains</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.trends || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(59,130,246,0.1)' }} />
              <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-inflow-card rounded-xl border border-inflow-border p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Gains par canal</h2>
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="h-64 w-64 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={earningsArray}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {earningsArray.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatMoney(v)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {earningsArray.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                <span className="text-inflow-muted text-sm truncate">{name}</span>
                <span className="text-white text-sm font-medium ml-auto">
                  {total > 0 ? ((value / total) * 100).toFixed(2) : 0}%, {formatMoney(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
