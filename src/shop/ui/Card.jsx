import React from 'react'

/**
 * Composant Card réutilisable
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de la carte
 * @param {string} props.className - Classes CSS supplémentaires
 * @param {boolean} props.hover - Effet hover
 * @param {boolean} props.padding - Padding interne
 */
export default function Card({
  children,
  className = '',
  hover = false,
  padding = true,
  ...props
}) {
  const baseClasses = 'bg-white rounded-lg border border-slate-200'
  const hoverClass = hover ? 'transition-shadow hover:shadow-lg' : ''
  const paddingClass = padding ? 'p-6' : ''
  
  const classes = `${baseClasses} ${hoverClass} ${paddingClass} ${className}`.trim()
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
