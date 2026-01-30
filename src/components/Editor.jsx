import { EARNINGS_KEYS } from '../data/editorConfig'

function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-inflow-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-inflow-dark border border-inflow-border rounded px-3 py-2 text-sm text-white placeholder-inflow-muted focus:outline-none focus:ring-2 focus:ring-inflow-accent focus:border-transparent"
      />
    </div>
  )
}

function NumInput({ label, value, onChange, min = 0, step = 1 }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-inflow-muted">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={min}
        step={step}
        className="w-full bg-inflow-dark border border-inflow-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-inflow-accent focus:border-transparent"
      />
    </div>
  )
}

export default function Editor({ data, onUpdate }) {
  return (
    <div className="p-4 space-y-6">
      <h3 className="text-sm font-semibold text-white border-b border-inflow-border pb-2">
        Personnaliser le dashboard
      </h3>

      <section className="space-y-3">
        <h4 className="text-xs font-medium text-inflow-accent uppercase tracking-wider">Période</h4>
        <Input
          label="Date de début"
          value={data.period.start}
          onChange={(v) => onUpdate('period.start', v)}
          placeholder="1 oct. 2025"
        />
        <Input
          label="Date de fin"
          value={data.period.end}
          onChange={(v) => onUpdate('period.end', v)}
          placeholder="31 oct. 2025"
        />
      </section>

      <section className="space-y-3">
        <h4 className="text-xs font-medium text-inflow-accent uppercase tracking-wider">Gains totaux</h4>
        <NumInput
          label="Total ($)"
          value={data.totalEarnings}
          onChange={(v) => onUpdate('totalEarnings', v)}
          min={0}
          step={100}
        />
      </section>

      <section className="space-y-3">
        <h4 className="text-xs font-medium text-inflow-accent uppercase tracking-wider">Par source</h4>
        {EARNINGS_KEYS.map(({ key, label }) => (
          <NumInput
            key={key}
            label={label}
            value={data.earnings[key] ?? 0}
            onChange={(v) => onUpdate(`earnings.${key}`, v)}
            min={0}
            step={10}
          />
        ))}
      </section>

      <section className="space-y-3">
        <h4 className="text-xs font-medium text-inflow-accent uppercase tracking-wider">Tendances (exemple)</h4>
        <p className="text-xs text-inflow-muted">
          Les points du graphique sont générés à partir du total. Modifiez le total ou les gains par source pour voir les tendances se recalculer.
        </p>
        <button
          onClick={() => {
            const arr = data.trends || []
            const len = Math.max(arr.length, 16)
            const base = data.totalEarnings / len
            const newTrends = Array.from({ length: len }, (_, i) => ({
              day: arr[i]?.day || `${i * 2 + 1} oct.`,
              earnings: Math.round(base * (0.7 + Math.random() * 0.6)),
              growth: (Math.random() - 0.5) * 80,
            }))
            onUpdate('trends', newTrends)
          }}
          className="w-full text-sm py-2 rounded bg-inflow-border text-inflow-muted hover:bg-inflow-accent hover:text-white"
        >
          Aléatoriser les tendances
        </button>
      </section>
    </div>
  )
}
