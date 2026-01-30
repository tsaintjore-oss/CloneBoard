# Site de Vente - Structure du Projet

## 📁 Structure des dossiers

```
src/shop/
├── layouts/          # Layouts globaux
│   ├── Header.jsx   # En-tête avec navigation
│   ├── Footer.jsx   # Pied de page
│   └── Layout.jsx   # Layout principal (wrapper)
├── ui/              # Composants UI réutilisables
│   ├── Button.jsx   # Bouton
│   ├── Card.jsx     # Carte
│   ├── Input.jsx    # Champ de saisie
│   ├── Badge.jsx    # Badge/étiquette
│   └── index.js     # Export centralisé
├── styles/          # Styles CSS
│   └── shop.css     # Styles globaux du shop
├── App.jsx          # Composant principal
└── main.jsx         # Point d'entrée React
```

## 🎨 Système de design

### Couleurs

Le système de design utilise une palette de couleurs cohérente définie dans `tailwind.config.js` :

- **Primaire** : Bleu (`shop-primary`)
- **Secondaire** : Gris ardoise (`shop-secondary`)
- **Accent** : Orange (`shop-accent`)
- **Succès** : Vert (`shop-success`)
- **Erreur** : Rouge (`shop-error`)

### Composants UI

Tous les composants UI sont disponibles dans `src/shop/ui/` :

- `Button` : Boutons avec variantes (primary, secondary, outline, ghost, danger)
- `Card` : Cartes avec support hover
- `Input` : Champs de saisie avec label et gestion d'erreur
- `Badge` : Badges avec différentes variantes de couleur

## 🚀 Utilisation

### Accéder au site de vente

Le site de vente est accessible via `shop.html`. Pour le lancer :

```bash
npm run dev
```

Puis ouvrir `http://localhost:5173/shop.html`

### Utiliser les composants

```jsx
import { Button, Card, Input, Badge } from './ui'

function MyComponent() {
  return (
    <Card hover>
      <h2>Titre</h2>
      <Input label="Nom" placeholder="Entrez votre nom" />
      <Button variant="primary" size="md">
        Valider
      </Button>
      <Badge variant="success">Nouveau</Badge>
    </Card>
  )
}
```

## 📝 Prochaines étapes

Les fondations techniques sont en place. Les prochaines étapes incluront :

- [ ] Pages de produits
- [ ] Page de détail produit
- [ ] Panier d'achat
- [ ] Page de checkout
- [ ] Gestion des utilisateurs
- [ ] Intégration avec le backend
