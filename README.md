# Pomodoro Timer

Application Pomodoro moderne construite avec React, Vite et Tailwind CSS.

## Fonctionnalités

- ⏱️ **Timer personnalisable** - Configurez les durées de travail, pauses courtes et pauses longues
- 📝 **Gestion des tâches** - Notez la tâche en cours avec sauvegarde automatique
- 📊 **Statistiques** - Visualisez vos sessions du jour et de la semaine
- 💾 **Stockage local** - Toutes vos données sont sauvegardées dans le navigateur
- 🔔 **Notifications** - Notifications sonores et navigateur à la fin de chaque session
- 🎨 **Design moderne** - Interface responsive et animations fluides
- 🍅 **Technique Pomodoro** - Respecte la méthode classique (4 sessions → pause longue)

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## Structure du projet

```
Pomodoro/
├── public/                  # Fichiers statiques
│   └── notification.mp3     # Son de notification (à ajouter)
├── src/
│   ├── components/          # Composants React
│   │   ├── Layout/          # Header, Container
│   │   ├── Timer/           # Timer, Controls, Settings
│   │   ├── Task/            # Input pour tâche
│   │   └── Statistics/      # Stats jour/semaine
│   ├── context/             # State management (Context API)
│   ├── hooks/               # Custom hooks
│   │   ├── useTimer.js      # Logique du timer
│   │   ├── useStats.js      # Calculs statistiques
│   │   ├── useNotification.js
│   │   └── useLocalStorage.js
│   ├── utils/               # Fonctions utilitaires
│   │   ├── constants.js     # Constantes
│   │   ├── time.js          # Formatage temps
│   │   └── storage.js       # localStorage helpers
│   ├── App.jsx              # Composant racine
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── index.html               # Template HTML
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Configuration Tailwind
└── package.json
```

## Utilisation

### Démarrer le timer

1. Cliquez sur **Démarrer** pour lancer une session de travail
2. Concentrez-vous sur votre tâche pendant 25 minutes (durée par défaut)
3. Prenez une pause de 5 minutes quand le timer se termine
4. Après 4 sessions de travail, profitez d'une pause longue de 15 minutes

### Personnaliser les durées

1. Cliquez sur l'icône **Paramètres** (⚙️) en haut à droite
2. Modifiez les durées selon vos préférences
3. Cliquez sur **Sauvegarder**

⚠️ Les paramètres ne peuvent être modifiés que lorsque le timer est arrêté ou en pause.

### Suivre vos statistiques

Les statistiques sont automatiquement calculées et affichées en bas de la page :
- **Aujourd'hui** : Sessions et temps total du jour
- **Cette semaine** : Graphique des 7 derniers jours et moyenne

## Configuration

### Fichier audio de notification

Pour activer les notifications sonores :

1. Téléchargez un fichier audio court (1-3 secondes)
2. Nommez-le `notification.mp3`
3. Placez-le dans le dossier `public/`

Sources gratuites : [Freesound.org](https://freesound.org/), [Mixkit.co](https://mixkit.co/)

### Permissions navigateur

L'application demandera la permission d'afficher des notifications au premier démarrage du timer.

## Technologies utilisées

- **React 19** - Framework UI
- **Vite 6** - Build tool
- **Tailwind CSS 4** - Framework CSS utility-first
- **Context API** - State management
- **localStorage** - Persistence des données
- **Web Notifications API** - Notifications navigateur

## Fonctionnalités techniques

### État du timer (State Machine)

```
IDLE → RUNNING → PAUSED → COMPLETED → (Auto-transition)
  ↑                                          ↓
  └──────────────────────────────────────────┘
```

### Schéma localStorage

```javascript
// Paramètres
pomodoro_settings: {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4
}

// Tâche en cours
pomodoro_current_task: {
  text: "Nom de la tâche",
  startedAt: "2026-01-12T10:30:00Z"
}

// Historique des sessions
pomodoro_sessions: [
  {
    id: "uuid",
    task: "Nom de la tâche",
    type: "work" | "short-break" | "long-break",
    duration: 25,
    completedAt: "2026-01-12T10:55:00Z",
    date: "2026-01-12"
  }
]
```

### Custom Hooks

- **useTimer** : Gère la logique du timer (compte à rebours, transitions)
- **useStats** : Calcule les statistiques jour/semaine
- **useNotification** : Gère les notifications sonores et navigateur
- **useLocalStorage** : Synchronise l'état avec localStorage

## Responsive Design

L'application s'adapte automatiquement à toutes les tailles d'écran :
- 📱 Mobile : Layout vertical compact
- 📱 Tablet : Layout optimisé
- 💻 Desktop : Layout large avec toutes les fonctionnalités

## Raccourcis clavier (Futur)

- `Espace` : Démarrer/Pause
- `R` : Reset
- `S` : Skip session
- `Esc` : Fermer le modal

## Développement

### Commandes utiles

```bash
# Dev avec hot reload
npm run dev

# Build optimisé
npm run build

# Test du build
npm run preview
```

### Ajout de fonctionnalités futures

- Mode sombre
- Sons personnalisables
- Catégories de tâches
- Export des statistiques (CSV)
- Intégration PWA
- Cloud sync

## License

MIT

## Auteur

Créé avec ❤️ et 🍅
