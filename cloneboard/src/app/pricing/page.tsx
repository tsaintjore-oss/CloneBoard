export default function PricingPage() {
  return (
    <div className="min-h-screen bg-premium-bg text-premium-text">
      <main>
        {/* HERO */}
        <section className="pt-32 pb-section md:pt-40 md:pb-section">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto text-center animate-float-up">
              <div className="inline-flex items-center gap-3 rounded-full glass px-5 py-2.5 mb-8">
                <span className="h-2 w-2 rounded-full bg-premium-accent animate-glow-pulse" />
                <span className="text-sm font-medium text-premium-text-secondary">Pricing</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-8">
                Simple.{' '}
                <span className="text-premium-accent">Premium.</span>{' '}
                Clair.
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-premium-text-secondary max-w-4xl mx-auto leading-relaxed">
                Deux options. Une seule promesse : un fake dashboard au rendu haut de gamme.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="pb-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-12 max-w-6xl mx-auto">
              {/* Highlighted plan - InFlow */}
              <div className="lg:col-span-7 animate-scale-in delay-100">
                <div className="relative floating-section">
                  {/* Glow effect */}
                  <div className="absolute -inset-8 rounded-glass-xl bg-gradient-to-br from-premium-accent-glow/30 via-transparent to-transparent blur-3xl" />
                  
                  {/* Main card */}
                  <div className="relative glass-elevated rounded-glass-xl p-10 md:p-14">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full glass px-4 py-2 mb-6">
                      <span className="text-xs font-medium text-premium-text">Recommandé</span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                      <div>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                          InFlow
                        </h2>
                        <p className="text-lg text-premium-text-secondary max-w-md leading-relaxed">
                          Le fake dashboard premium prêt à présenter.
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-6xl md:text-7xl font-semibold tracking-tight mb-2">€49</div>
                        <div className="text-sm text-premium-text-muted">paiement unique</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid gap-5 md:grid-cols-2 mb-12">
                      {[
                        'Rendu premium (dark gray, off‑white)',
                        'Données fictives cohérentes',
                        'Personnalisation simple (totals/périodes)',
                        'Export propre (prêt à screenshot)',
                      ].map((feature, i) => (
                        <div key={feature} className="flex items-start gap-3 animate-float-up" style={{ animationDelay: `${200 + i * 50}ms` }}>
                          <span className="mt-2 h-2 w-2 rounded-full bg-premium-accent flex-shrink-0" />
                          <div className="text-base text-premium-text">{feature}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <a href="/get-started" className="btn btn-primary btn-lg">
                        Acheter InFlow
                      </a>
                      <a href="/examples" className="btn btn-secondary btn-lg">
                        Voir des exemples
                      </a>
                    </div>

                    <p className="text-sm text-premium-text-muted">
                      Transparent : vendu comme faux • Aucune intégration • Aucune donnée réelle
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondary plan - Custom */}
              <div className="lg:col-span-5 animate-scale-in delay-200">
                <div className="glass-elevated rounded-glass-xl p-10 md:p-14 h-full flex flex-col">
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                    Clone sur mesure
                  </h3>
                  
                  <p className="text-lg text-premium-text-secondary mb-8 leading-relaxed">
                    Un clone factice adapté à ton branding et ton scénario de démo.
                  </p>

                  <div className="mb-10">
                    <div className="text-5xl font-semibold tracking-tight mb-2">Sur devis</div>
                    <div className="text-sm text-premium-text-muted">projet unique</div>
                  </div>

                  <div className="space-y-4 mb-10 flex-grow">
                    {[
                      'UI personnalisée (branding, sections)',
                      'Données fictives sur mesure',
                      'Finition premium',
                    ].map((feature, i) => (
                      <div key={feature} className="flex items-start gap-3 animate-float-up" style={{ animationDelay: `${300 + i * 50}ms` }}>
                        <span className="mt-2 h-2 w-2 rounded-full bg-premium-accent flex-shrink-0" />
                        <div className="text-base text-premium-text">{feature}</div>
                      </div>
                    ))}
                  </div>

                  <a href="/get-started" className="btn btn-secondary btn-lg w-full">
                    Demander un devis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust note */}
        <section className="pb-section">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="glass rounded-glass-xl p-10 text-center animate-fade-in delay-300">
              <p className="text-lg text-premium-text-secondary leading-relaxed">
                Tous les produits sont vendus comme <span className="text-premium-text font-medium">factices</span>. 
                Aucune ambiguïté. Aucune surprise.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
