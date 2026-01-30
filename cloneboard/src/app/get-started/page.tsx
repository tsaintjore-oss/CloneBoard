'use client'

import { useState } from 'react'

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const product = {
    name: 'InFlow',
    description: 'Dashboard factice premium prêt à présenter',
    price: 49,
    features: [
      'Dashboard InFlow complet',
      'Données d\'exemple cohérentes',
      'Design premium (dark theme)',
      'Graphiques interactifs',
      'Export PNG haute qualité',
      'Personnalisation des données',
      'Support par email',
    ],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-premium-bg text-premium-text">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center animate-float-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            Finaliser votre achat
          </h1>
          <p className="text-xl md:text-2xl text-premium-text-secondary max-w-3xl mx-auto leading-relaxed">
            Confirme ton email et procède au paiement. Simple, rapide et sécurisé.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Checkout Form - 2 columns */}
          <div className="lg:col-span-2 animate-scale-in delay-100">
            <div className="glass-elevated rounded-glass-xl p-10 md:p-12">
              {/* Form header */}
              <div className="mb-10">
                <p className="text-xs font-medium tracking-[0.2em] text-premium-text-muted uppercase mb-3">CHECKOUT</p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Paiement (démo)</h2>
                <p className="text-sm text-premium-text-muted mt-2">
                  Paiement simulé • UX prête à brancher
                </p>
              </div>

              {isSuccess ? (
                <div className="glass-strong rounded-glass-lg p-8 animate-scale-in">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-premium-accent-soft border border-glass-border-strong flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-premium-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-semibold mb-3">Commande confirmée (démo)</p>
                      <p className="text-base leading-relaxed text-premium-text-secondary mb-6">
                        Tu viens d'acheter <span className="font-medium text-premium-text">InFlow</span> pour{' '}
                        <span className="font-medium text-premium-text">€{product.price}</span>.
                        <br />
                        (Ici, on afficherait un lien de téléchargement + la facture.)
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a href="/examples" className="btn btn-secondary btn-md">
                          Voir d'autres exemples
                        </a>
                        <a href="/" className="btn btn-primary btn-md">
                          Retour à l'accueil
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-3 text-premium-text">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="ton@email.com"
                      className="w-full px-5 py-4 rounded-glass-lg glass border border-glass-border text-premium-text placeholder:text-premium-text-muted focus:outline-none focus:ring-2 focus:ring-premium-accent-glow focus:border-glass-border-strong transition-all"
                    />
                    <p className="mt-2 text-xs text-premium-text-muted">
                      On t'enverra le lien de téléchargement à cette adresse
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium mb-4 text-premium-text">
                      Méthode de paiement
                    </label>
                    <div className="glass rounded-glass-lg p-5 border border-glass-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-base">Carte bancaire</div>
                          <div className="text-sm text-premium-text-muted mt-1">
                            Visa, Mastercard, American Express
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-premium-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium mb-3 text-premium-text">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-5 py-4 rounded-glass-lg glass border border-glass-border text-premium-text placeholder:text-premium-text-muted focus:outline-none focus:ring-2 focus:ring-premium-accent-glow focus:border-glass-border-strong transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-3 text-premium-text">
                          Expiration
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/AA"
                          required
                          className="w-full px-5 py-4 rounded-glass-lg glass border border-glass-border text-premium-text placeholder:text-premium-text-muted focus:outline-none focus:ring-2 focus:ring-premium-accent-glow focus:border-glass-border-strong transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium mb-3 text-premium-text">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          placeholder="123"
                          required
                          className="w-full px-5 py-4 rounded-glass-lg glass border border-glass-border text-premium-text placeholder:text-premium-text-muted focus:outline-none focus:ring-2 focus:ring-premium-accent-glow focus:border-glass-border-strong transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn btn-primary btn-lg w-full"
                  >
                    {isProcessing ? 'Traitement...' : `Payer €${product.price}`}
                  </button>

                  {/* Security Note */}
                  <p className="text-xs text-center text-premium-text-muted">
                    Interface de paiement de démonstration (simulation). Prête à brancher à Stripe/PayPal.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary - 1 column */}
          <div className="lg:col-span-1 animate-scale-in delay-200">
            <div className="sticky top-8">
              <div className="glass-elevated rounded-glass-xl p-8">
                <h2 className="text-xl font-semibold mb-8">Récapitulatif</h2>

                {/* Product Info */}
                <div className="mb-8 pb-8 border-b border-glass-border">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-premium-text-secondary leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-8 pb-8 border-b border-glass-border">
                  <p className="text-xs font-medium text-premium-text-muted mb-4 uppercase tracking-wider">
                    Inclus
                  </p>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-premium-text-secondary">
                        <svg className="w-5 h-5 shrink-0 mt-0.5 text-premium-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base text-premium-text-secondary">Total</span>
                    <span className="text-3xl font-semibold">€{product.price}</span>
                  </div>
                  <p className="text-xs text-premium-text-muted">
                    Paiement unique • Pas d'abonnement
                  </p>
                </div>

                {/* Important Notice */}
                <div className="glass-strong rounded-glass-lg p-6 border border-glass-border-strong">
                  <p className="text-sm font-semibold text-premium-text mb-3">
                    ⚠️ Important
                  </p>
                  <p className="text-xs leading-relaxed text-premium-text-secondary">
                    InFlow est un <strong className="font-semibold text-premium-text">dashboard factice</strong>. 
                    Les données sont fictives et générées localement. Aucune connexion à des services tiers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
