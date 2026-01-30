export default function Header({ dateRange, onToggleEditor, showEditor }) {
  return (
    <header className="h-14 shrink-0 border-b border-inflow-border flex items-center justify-between px-6 bg-inflow-dark">
      <div className="flex items-center gap-4">
        <button className="p-1.5 rounded text-inflow-muted hover:text-white hover:bg-white/5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="p-1.5 rounded text-inflow-muted hover:text-white hover:bg-white/5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-lg font-semibold text-white">Infloww</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Operational</span>
        <span className="text-xs text-inflow-muted">UTC+01:00</span>
        <a href="#" className="text-sm text-inflow-muted hover:text-white">Referrals</a>
        <a href="#" className="text-sm text-inflow-muted hover:text-white">Leaderboard</a>
        <label className="flex items-center gap-2 text-sm text-inflow-muted">
          <span>SFW</span>
          <input type="checkbox" className="rounded bg-inflow-border" />
        </label>
        <button className="p-1.5 rounded text-inflow-muted hover:text-white hover:bg-white/5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-inflow-accent flex items-center justify-center text-white text-sm font-medium">
          U
        </div>
        <button
          onClick={onToggleEditor}
          className={`text-sm px-3 py-1.5 rounded ${
            showEditor ? 'bg-inflow-accent text-white' : 'bg-inflow-border text-inflow-muted hover:text-white'
          }`}
        >
          Personnaliser
        </button>
      </div>
    </header>
  )
}
