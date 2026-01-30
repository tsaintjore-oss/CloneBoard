import React from 'react'
import Header from './Header'
import Footer from './Footer'

/**
 * Layout global pour le site de vente
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de la page
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
