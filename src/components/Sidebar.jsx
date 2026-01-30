export default function Sidebar() {
  const links = [
    { label: 'Dashboard', active: false },
    { label: 'OF Manager', active: false },
    { label: 'Analytics', active: true, sub: ['Creator Reports', 'Employee Reports', 'Fan Reports'] },
    { label: 'Message Dashboard', active: false },
    { label: 'Messages Pro', active: false, badge: 'C' },
    { label: 'Growth', active: false },
    { label: 'Share for Share', active: false },
    { label: 'Creators', active: false },
    { label: 'Employees', active: false },
  ]

  return (
    <aside className="w-56 shrink-0 bg-inflow-sidebar flex flex-col border-r border-inflow-border">
      <div className="p-4 flex items-center gap-2 border-b border-inflow-border">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-sm font-bold">
          OF
        </div>
        <span className="text-inflow-muted text-sm">OnlyFans</span>
      </div>
      <nav className="flex-1 py-3 overflow-auto">
        {links.map((l) => (
          <div key={l.label}>
            <a
              href="#"
              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                l.active ? 'text-inflow-accent bg-inflow-accent/10' : 'text-inflow-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {l.badge && (
                <span className="w-5 h-5 rounded bg-red-500/80 text-white text-xs flex items-center justify-center font-bold">
                  {l.badge}
                </span>
              )}
              {l.label}
            </a>
            {l.sub && l.active && (
              <div className="pl-6 py-1">
                {l.sub.map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="block py-1.5 text-sm text-inflow-accent font-medium"
                  >
                    {s}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-inflow-border space-y-1">
        <a href="#" className="block text-sm text-inflow-muted hover:text-white">Settings</a>
        <a href="#" className="block text-sm text-inflow-muted hover:text-white">Help center</a>
        <p className="text-xs text-inflow-muted pt-2">Version 5.5.0</p>
      </div>
    </aside>
  )
}
