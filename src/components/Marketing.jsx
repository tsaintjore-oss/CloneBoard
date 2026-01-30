import React from 'react'

const Section = ({ children, className = '' }) => (
  <section className={`px-6 ${className}`}>
    <div className="mx-auto w-full max-w-6xl">{children}</div>
  </section>
)

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-inflow-border bg-inflow-card/70 p-6 ${className}`}>
    {children}
  </div>
)

function goToApp() {
  // Pas de dépendance router : navigation simple.
  window.location.href = '/app'
}

function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    amount,
  )
}

export default function Marketing() {
  return (
    <div className="min-h-screen bg-inflow-dark text-gray-100">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-inflow-border/70 bg-inflow-dark/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-inflow-accent to-purple-500" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">InFlow</div>
              <div className="text-xs text-inflow-muted">Dashboard ventes & revenus</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a className="hidden text-sm text-gray-200/80 hover:text-gray-100 md:inline" href="#pricing">
              Tarifs
            </a>
            <a className="hidden text-sm text-gray-200/80 hover:text-gray-100 md:inline" href="#faq">
              FAQ
            </a>
            <button
              onClick={goToApp}
              className="rounded-xl bg-inflow-accent px-4 py-2 text-sm font-semibold text-white hover:bg-inflow-accentHover"
            >
              Voir la démo
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <Section className="pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-inflow-border bg-inflow-card/40 px-3 py-1 text-xs text-gray-200/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Démo interactive incluse
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Le dashboard qui transforme tes chiffres en décisions.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-200/80">
              InFlow t’aide à piloter tes ventes : revenus, croissance, transactions, tendances. Simple, lisible, et
              prêt à montrer à un client.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={goToApp}
                className="rounded-xl bg-inflow-accent px-6 py-3 text-sm font-semibold text-white hover:bg-inflow-accentHover"
              >
                Démarrer la démo
              </button>
              <a
                href="#features"
                className="rounded-xl border border-inflow-border bg-inflow-card/40 px-6 py-3 text-sm font-semibold text-gray-100 hover:bg-inflow-card/70"
              >
                Voir les fonctionnalités
              </a>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <Card className="p-4">
                <div className="text-xs text-inflow-muted">Mise en place</div>
                <div className="mt-1 text-lg font-semibold">5 min</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-inflow-muted">Rapports</div>
                <div className="mt-1 text-lg font-semibold">Automatiques</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-inflow-muted">Export</div>
                <div className="mt-1 text-lg font-semibold">PNG / partage</div>
              </Card>
            </div>
          </div>

          {/* Preview mock */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-inflow-accent/25 via-purple-500/10 to-emerald-400/10 blur-2xl" />
            <div className="rounded-3xl border border-inflow-border bg-inflow-sidebar/40 p-4 shadow-[0_0_0_1px_rgba(42,46,58,0.5)]">
              <div className="flex items-center gap-2 border-b border-inflow-border pb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <div className="ml-2 text-xs text-gray-200/60">Aperçu InFlow</div>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="grid grid-cols-3 gap-3">
                  <Card className="p-4">
                    <div className="text-xs text-inflow-muted">Revenus</div>
                    <div className="mt-1 text-xl font-semibold">{formatPrice(28450)}</div>
                    <div className="mt-2 text-xs text-emerald-300/80">+18% ce mois</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-xs text-inflow-muted">Transactions</div>
                    <div className="mt-1 text-xl font-semibold">1 284</div>
                    <div className="mt-2 text-xs text-emerald-300/80">+7% ce mois</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-xs text-inflow-muted">ARPU</div>
                    <div className="mt-1 text-xl font-semibold">{formatPrice(22)}</div>
                    <div className="mt-2 text-xs text-gray-200/60">stable</div>
                  </Card>
                </div>
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Croissance</div>
                      <div className="text-xs text-inflow-muted">7 derniers jours</div>
                    </div>
                    <div className="text-xs text-emerald-300/80">tendance positive</div>
                  </div>
                  <div className="mt-4 h-28 w-full rounded-xl border border-inflow-border bg-gradient-to-b from-inflow-accent/15 to-transparent" />
                </Card>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-4">
                    <div className="text-xs text-inflow-muted">Top offre</div>
                    <div className="mt-1 text-sm font-semibold">Abonnement Premium</div>
                    <div className="mt-2 text-xs text-gray-200/60">Conversion 4.2%</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-xs text-inflow-muted">Alertes</div>
                    <div className="mt-1 text-sm font-semibold">Aucune anomalie</div>
                    <div className="mt-2 text-xs text-gray-200/60">Dernière sync 2 min</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Social proof */}
      <Section className="py-10">
        <div className="grid gap-4 rounded-3xl border border-inflow-border bg-inflow-card/40 p-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">Pensé pour vendre</div>
            <div className="mt-1 text-sm text-gray-200/70">
              Une interface qui rassure et qui explique en 30 secondes.
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Données lisibles</div>
            <div className="mt-1 text-sm text-gray-200/70">
              KPI clés, tendances, breakdowns : tu vas droit au point.
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Partage instantané</div>
            <div className="mt-1 text-sm text-gray-200/70">
              Exports, captures, et une démo qui tourne localement.
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="py-12" id="features">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Fonctionnalités clés</h2>
            <p className="mt-2 text-sm text-gray-200/70">
              Tout ce qu’il faut pour présenter, convaincre, et faire évoluer.
            </p>
          </div>
          <button
            onClick={goToApp}
            className="hidden rounded-xl border border-inflow-border bg-inflow-card/40 px-4 py-2 text-sm font-semibold hover:bg-inflow-card/70 md:inline"
          >
            Ouvrir la démo
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <div className="text-sm font-semibold">KPIs & graphiques</div>
            <p className="mt-2 text-sm text-gray-200/70">Revenus, croissance, répartition : une lecture immédiate.</p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Transactions & filtres</div>
            <p className="mt-2 text-sm text-gray-200/70">Comprendre le détail sans perdre la vision d’ensemble.</p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Éditeur de données</div>
            <p className="mt-2 text-sm text-gray-200/70">
              Charge, modifie, enregistre : parfait pour une démo “sur-mesure”.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Export visuel</div>
            <p className="mt-2 text-sm text-gray-200/70">Capture de l’état du dashboard pour partager vite.</p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Design premium</div>
            <p className="mt-2 text-sm text-gray-200/70">Interface sombre moderne, lisible, pro.</p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Prêt à brancher</div>
            <p className="mt-2 text-sm text-gray-200/70">
              Aujourd’hui “fake data”, demain une vraie source (API/DB).
            </p>
          </Card>
        </div>
      </Section>

      {/* Pricing */}
      <Section className="py-12" id="pricing">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">Tarifs simples</h2>
          <p className="text-sm text-gray-200/70">Des packs clairs pour une vente sans friction.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <div className="text-sm font-semibold">Starter</div>
            <div className="mt-3 text-3xl font-bold">{formatPrice(29)}</div>
            <div className="mt-1 text-xs text-gray-200/60">par mois</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-200/80">
              <li>Dashboard de base</li>
              <li>KPIs + graphiques</li>
              <li>Support email</li>
            </ul>
            <button
              onClick={goToApp}
              className="mt-6 w-full rounded-xl border border-inflow-border bg-inflow-card/40 px-4 py-2 text-sm font-semibold hover:bg-inflow-card/70"
            >
              Tester
            </button>
          </Card>

          <Card className="relative overflow-hidden border-inflow-accent/60">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-inflow-accent/20 blur-2xl" />
            <div className="inline-flex rounded-full bg-inflow-accent/15 px-3 py-1 text-xs font-semibold text-inflow-accent">
              Le plus populaire
            </div>
            <div className="mt-3 text-sm font-semibold">Pro</div>
            <div className="mt-3 text-3xl font-bold">{formatPrice(79)}</div>
            <div className="mt-1 text-xs text-gray-200/60">par mois</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-200/80">
              <li>Tout Starter</li>
              <li>Éditeur de données</li>
              <li>Export & partage</li>
              <li>Support prioritaire</li>
            </ul>
            <button
              onClick={goToApp}
              className="mt-6 w-full rounded-xl bg-inflow-accent px-4 py-2 text-sm font-semibold text-white hover:bg-inflow-accentHover"
            >
              Démarrer
            </button>
          </Card>

          <Card>
            <div className="text-sm font-semibold">Business</div>
            <div className="mt-3 text-3xl font-bold">{formatPrice(149)}</div>
            <div className="mt-1 text-xs text-gray-200/60">par mois</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-200/80">
              <li>Tout Pro</li>
              <li>Branding personnalisé</li>
              <li>Intégrations sur mesure</li>
              <li>Support dédié</li>
            </ul>
            <button
              onClick={goToApp}
              className="mt-6 w-full rounded-xl border border-inflow-border bg-inflow-card/40 px-4 py-2 text-sm font-semibold hover:bg-inflow-card/70"
            >
              Parler à l’équipe
            </button>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-12" id="faq">
        <h2 className="text-2xl font-bold md:text-3xl">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-sm font-semibold">C’est une vraie app ?</div>
            <p className="mt-2 text-sm text-gray-200/70">
              Oui : la démo tourne en local avec un backend. Les données sont “fake” mais la structure est prête à être
              branchée sur une vraie source.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Je peux personnaliser le branding ?</div>
            <p className="mt-2 text-sm text-gray-200/70">
              Logo, couleurs, libellés : c’est prévu (pack Business) et rapide à adapter.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Est-ce que ça marche sur mobile ?</div>
            <p className="mt-2 text-sm text-gray-200/70">
              Le site vitrine oui. Le dashboard est optimisé desktop (usage pro), avec une base responsive.
            </p>
          </Card>
          <Card>
            <div className="text-sm font-semibold">Comment je montre la démo à un client ?</div>
            <p className="mt-2 text-sm text-gray-200/70">
              Tu lances le projet, tu vas sur <span className="font-semibold">/app</span>, tu charges des données et tu
              partages des exports/captures.
            </p>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-inflow-border/70 bg-inflow-dark/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-200/60">© {new Date().getFullYear()} InFlow. Tous droits réservés.</div>
          <div className="flex items-center gap-4 text-sm">
            <button onClick={goToApp} className="text-gray-200/70 hover:text-gray-100">
              Démo
            </button>
            <a href="#pricing" className="text-gray-200/70 hover:text-gray-100">
              Tarifs
            </a>
            <a href="#faq" className="text-gray-200/70 hover:text-gray-100">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

