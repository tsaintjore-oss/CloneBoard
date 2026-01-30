/**
 * Configuration des routes pour le site de vente
 * Ce fichier sera utilisé lorsque le routing sera implémenté
 */

export const routes = {
  home: '/',
  products: '/products',
  productDetail: '/products/:id',
  categories: '/categories',
  categoryDetail: '/categories/:slug',
  cart: '/cart',
  checkout: '/checkout',
  about: '/about',
  contact: '/contact',
  account: '/account',
  login: '/login',
  register: '/register',
}

/**
 * Navigation principale
 */
export const mainNavigation = [
  { label: 'Accueil', path: routes.home },
  { label: 'Produits', path: routes.products },
  { label: 'Catégories', path: routes.categories },
  { label: 'À propos', path: routes.about },
  { label: 'Contact', path: routes.contact },
]

/**
 * Navigation du footer
 */
export const footerNavigation = {
  about: [
    { label: 'Notre histoire', path: '/about' },
    { label: 'Notre équipe', path: '/team' },
    { label: 'Carrières', path: '/careers' },
  ],
  help: [
    { label: 'FAQ', path: '/faq' },
    { label: 'Livraison', path: '/shipping' },
    { label: 'Retours', path: '/returns' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Confidentialité', path: '/privacy' },
    { label: 'Conditions d\'utilisation', path: '/terms' },
    { label: 'Cookies', path: '/cookies' },
  ],
}
