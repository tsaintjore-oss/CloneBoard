export default function Home() {
  return (
    <div className="min-h-screen bg-premium-bg text-premium-text">
      <main>
        {/* HERO - Minimal, impactful */}
        <section className="pt-32 pb-section md:pt-40 md:pb-section">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="max-w-5xl animate-float-up">
              <div className="inline-flex items-center gap-3 rounded-full glass px-5 py-2.5 mb-8">
                <span className="h-2 w-2 rounded-full bg-premium-accent animate-glow-pulse" />
                <span className="text-sm font-medium text-premium-text-secondary">Fake dashboards & clones</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-8">
                Cloneboard vend des dashboards{' '}
                <span className="text-premium-accent">factices</span> et des{' '}
                <span className="text-premium-accent">clones</span>.
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl text-premium-text-secondary max-w-3xl leading-relaxed mb-12">
                Pour des démos premium — crédibles, sans données réelles, sans intégrations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="/get-started"
                  className="btn btn-primary btn-lg"
                >
                  Acheter InFlow — €49
                </a>
                <a
                  href="/examples"
                  className="btn btn-secondary btn-lg"
                >
                  Voir des exemples
                </a>
              </div>

              <p className="text-sm text-premium-text-muted">
                Paiement unique • Prêt à screenshot • Transparent: vendu comme faux
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCT - One purpose: showcase InFlow */}
        <section id="inflow" className="py-section border-t border-glass-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
              {/* Content */}
              <div className="lg:col-span-5 animate-float-up delay-100">
                <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-6">
                  <span className="text-xs font-medium text-premium-text-secondary">PRODUIT</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
                  InFlow, le fake dashboard{' '}
                  <span className="text-premium-accent">premium</span>.
                </h2>
                
                <p className="text-lg md:text-xl text-premium-text-secondary max-w-xl leading-relaxed mb-12">
                  Réalisme visuel + finition premium + personnalisation complète.
                </p>

                <div className="space-y-6 mb-12">
                  {[
                    ["Réalisme", "Données cohérentes. Rien ne \"sonne faux\"."],
                    ["Design", "Typo & contrastes haut de gamme."],
                    ["Personnalisation", "Modifie totals, périodes, tendances."],
                  ].map(([title, desc], i) => (
                    <div key={title} className="flex items-start gap-4 animate-float-up" style={{ animationDelay: `${200 + i * 100}ms` }}>
                      <div className="mt-2 h-2 w-2 rounded-full bg-premium-accent flex-shrink-0" />
                      <div>
                        <div className="text-base font-semibold mb-1">{title}</div>
                        <div className="text-sm text-premium-text-secondary leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="/get-started"
                  className="btn btn-primary btn-lg"
                >
                  Acheter InFlow — €49
                </a>
              </div>

              {/* Visual - Floating glass card */}
              <div className="lg:col-span-7 animate-scale-in delay-200">
                <div className="relative floating-section">
                  {/* Glow effect */}
                  <div className="absolute -inset-8 rounded-glass-xl bg-gradient-to-br from-premium-accent-glow/30 via-transparent to-transparent blur-3xl" />
                  
                  {/* Main glass card */}
                  <div className="relative glass-elevated rounded-glass-xl p-8 md:p-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <p className="text-xs font-medium tracking-[0.2em] text-premium-text-muted uppercase mb-2">INFLOW • DASHBOARD</p>
                        <h3 className="text-2xl font-semibold">Aperçu (factice)</h3>
                      </div>
                      <div className="glass rounded-full px-4 py-2">
                        <span className="text-xs text-premium-text-secondary flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-premium-accent" />
                          Fictif, vendu comme tel
                        </span>
                      </div>
                    </div>

                    {/* Dashboard mock */}
                    <div className="glass-strong rounded-glass-lg p-8">
                      {/* Main metric */}
                      <div className="flex items-end justify-between mb-10">
                        <div>
                          <div className="text-xs text-premium-text-muted mb-2">Total earnings</div>
                          <div className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">$8,272.42</div>
                          <div className="text-sm text-premium-text-secondary">
                            Growth <span className="text-premium-accent font-medium">+12.2%</span>
                          </div>
                        </div>
                        <div className="h-16 w-16 rounded-glass-lg bg-premium-accent-soft border border-glass-border-strong flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-premium-accent/30" />
                        </div>
                      </div>

                      {/* Mini cards grid */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="glass rounded-glass p-4">
                            <div className="h-2 w-20 rounded-full bg-white/10 mb-3" />
                            <div className="h-3 w-16 rounded-full bg-white/15" />
                          </div>
                        ))}
                      </div>

                      {/* Chart area */}
                      <div className="h-40 rounded-glass-lg glass overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-br from-premium-accent-glow/20 via-transparent to-transparent" />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mt-8">
                      {["Réalisme", "Design", "Custom"].map((tag) => (
                        <div key={tag} className="glass rounded-full px-5 py-2">
                          <span className="text-sm text-premium-text-secondary">
                            <span className="text-premium-text font-medium">{tag}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST - Remove doubts */}
        <section id="trust" className="py-section border-t border-glass-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="max-w-4xl animate-float-up delay-300">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
                Clair. Transparent. Propre.
              </h2>
              
              <p className="text-xl md:text-2xl text-premium-text-secondary max-w-3xl leading-relaxed mb-16">
                Tu achètes un produit factice, vendu comme tel. Rien n'est caché.
              </p>

              <div className="grid gap-8 md:grid-cols-2 mb-12">
                {[
                  {
                    q: "C'est connecté à des données réelles ?",
                    a: "Non. Tout est fictif et local. Aucun compte tiers, aucune API, aucune récupération de données.",
                  },
                  {
                    q: "À quoi ça sert exactement ?",
                    a: "À vendre une vision : démo, portfolio, maquette, pitch. L'objectif est l'impact visuel premium.",
                  },
                ].map((item, i) => (
                  <div key={item.q} className="glass-elevated rounded-glass-xl p-10 animate-scale-in" style={{ animationDelay: `${400 + i * 100}ms` }}>
                    <div className="text-lg font-semibold mb-4">{item.q}</div>
                    <div className="text-base text-premium-text-secondary leading-relaxed">{item.a}</div>
                  </div>
                ))}
              </div>

              <a
                href="/pricing"
                className="btn btn-secondary btn-lg"
              >
                Voir les tarifs
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
