export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-premium-bg text-premium-text">
      <main>
        {/* HERO */}
        <section className="pt-32 pb-section md:pt-40 md:pb-section">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="max-w-5xl animate-float-up">
              <div className="inline-flex items-center gap-3 rounded-full glass px-5 py-2.5 mb-8">
                <span className="h-2 w-2 rounded-full bg-premium-accent animate-glow-pulse" />
                <span className="text-sm font-medium text-premium-text-secondary">Exemples</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-8">
                Exemples InFlow —{' '}
                <span className="text-premium-accent">réalisme premium</span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-premium-text-secondary max-w-4xl leading-relaxed">
                Des visuels factices, conçus pour paraître vrais — sans couleurs agressives, sans "template look".
              </p>
            </div>
          </div>
        </section>

        {/* MAIN DASHBOARD SHOWCASE */}
        <section className="pb-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="relative floating-section animate-scale-in delay-100">
              {/* Glow effect */}
              <div className="absolute -inset-12 rounded-glass-xl bg-gradient-to-br from-premium-accent-glow/25 via-transparent to-transparent blur-3xl" />
              
              {/* Main glass card */}
              <div className="relative glass-elevated rounded-glass-xl p-10 md:p-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-premium-text-muted uppercase mb-3">INFLOW • DASHBOARD</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">Aperçu (factice)</h2>
                  </div>
                  <div className="glass rounded-full px-5 py-2.5">
                    <span className="text-sm text-premium-text-secondary flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-premium-accent" />
                      Une seule couleur d'accent
                    </span>
                  </div>
                </div>

                {/* Premium dashboard mock */}
                <div className="glass-strong rounded-glass-lg p-10 md:p-12">
                  {/* Main metric */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                      <div className="text-sm text-premium-text-muted mb-3">Total earnings</div>
                      <div className="text-5xl md:text-6xl font-semibold tracking-tight mb-3">$8,272.42</div>
                      <div className="text-base text-premium-text-secondary">
                        Growth <span className="text-premium-accent font-medium">+12.2%</span>
                      </div>
                    </div>
                    <div className="h-20 w-20 rounded-glass-lg bg-premium-accent-soft border border-glass-border-strong flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-premium-accent/30" />
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {['Subscriptions','Tips','Posts','Referrals','Messages','Streams'].map((label) => (
                      <div key={label} className="glass rounded-glass p-5">
                        <div className="h-2.5 w-24 rounded-full bg-white/10 mb-4" />
                        <div className="text-xs text-premium-text-muted mb-2">{label}</div>
                        <div className="h-4 w-16 rounded-full bg-white/15" />
                      </div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="glass rounded-glass-lg p-6">
                      <div className="text-sm font-semibold mb-4">Earnings trend</div>
                      <div className="h-36 rounded-glass-lg glass overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-br from-premium-accent-glow/20 via-transparent to-transparent" />
                      </div>
                    </div>
                    <div className="glass rounded-glass-lg p-6">
                      <div className="text-sm font-semibold mb-4">Breakdown</div>
                      <div className="h-36 rounded-glass-lg glass overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-br from-premium-accent-glow/15 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12">
                  <a href="/get-started" className="btn btn-primary btn-lg">
                    Acheter InFlow — €49
                  </a>
                  <a href="/pricing" className="btn btn-secondary btn-lg">
                    Voir les tarifs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional visual elements */}
        <section className="pb-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Réalisme",
                  desc: "Données cohérentes et crédibles",
                },
                {
                  title: "Design",
                  desc: "Typographie et contrastes premium",
                },
                {
                  title: "Personnalisation",
                  desc: "Modifie tout selon tes besoins",
                },
              ].map((item, i) => (
                <div key={item.title} className="glass-elevated rounded-glass-xl p-8 animate-scale-in" style={{ animationDelay: `${200 + i * 100}ms` }}>
                  <div className="h-12 w-12 rounded-glass-lg bg-premium-accent-soft border border-glass-border-strong flex items-center justify-center mb-6">
                    <div className="h-6 w-6 rounded-full bg-premium-accent/40" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-base text-premium-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
