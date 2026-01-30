'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'InFlow', href: '/#inflow' },
    { label: 'Examples', href: '/examples' },
    { label: 'Pricing', href: '/pricing' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-semibold tracking-tight text-premium-text hover:opacity-80 transition-opacity duration-300"
          >
            <span className="relative">
              Cloneboard
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-premium-accent align-middle animate-glow-pulse" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-premium-text-secondary hover:text-premium-text transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-premium-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-6">
            {/* CTA Button */}
            <Link
              href="/get-started"
              className="hidden sm:inline-flex btn btn-primary btn-md"
            >
              Acheter InFlow
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-premium-text-secondary hover:text-premium-text transition-colors rounded-glass"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-8 pt-4 animate-scale-in">
            <div className="glass rounded-glass-lg p-6 space-y-4">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-premium-text-secondary hover:text-premium-text transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/get-started"
                  className="btn btn-primary btn-md mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acheter InFlow
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
      
      {/* Glass background overlay */}
      <div className="absolute inset-0 -z-10 glass-strong rounded-b-glass-xl" style={{ backdropFilter: 'blur(24px) saturate(180%)' }} />
    </header>
  )
}
