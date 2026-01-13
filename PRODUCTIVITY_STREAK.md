# Feature : Productivity Streak (Série de productivité)

## Ce qui a été ajouté

Une nouvelle fonctionnalité inspirée de GitHub pour visualiser votre productivité sur l'année 2026.

## Fichiers créés

### 1. `src/hooks/useStreak.js`
Hook personnalisé qui calcule :
- **Streak actuel** : Nombre de jours consécutifs avec au moins 1 session de travail (depuis aujourd'hui en remontant dans le passé)
- **Meilleur streak** : Record de jours consécutifs dans tout l'historique
- **Données du calendrier** : Pour chaque jour de 2026 (depuis le 1er janvier jusqu'à aujourd'hui), compte le nombre de sessions

### 2. `src/components/Statistics/StreakCalendar.jsx`
Composant qui affiche :
- Un calendrier visuel de l'année 2026 (du 1er janvier à aujourd'hui)
- Chaque jour = un petit carré coloré selon le nombre de sessions :
  - Gris clair : 0 session
  - Vert clair : 1-2 sessions
  - Vert moyen : 3-4 sessions
  - Vert foncé : 5+ sessions
- Deux grandes stats : Série actuelle et Meilleure série
- Légende des couleurs
- Tooltip au survol (date + nombre de sessions)
- Message d'encouragement

## Fichiers modifiés

### `src/components/Statistics/Stats.jsx`
**Modification minimale** : Ajout de l'import et du composant `<StreakCalendar />` sous les statistiques existantes.

## Comment ça fonctionne

1. Le hook `useStreak` récupère toutes les sessions depuis localStorage
2. Il compte uniquement les sessions de **type "work"** (pas les pauses)
3. Il crée un tableau pour chaque jour de 2026 (depuis le 1er janvier) avec le compte de sessions
4. Il calcule le streak actuel en partant d'aujourd'hui et en remontant
5. Il calcule le meilleur streak en parcourant tout l'historique
6. Le composant affiche tout ça de manière visuelle avec flex-wrap pour s'adapter automatiquement

## Logique des streaks

### Streak actuel
- Commence **aujourd'hui** et remonte dans le temps
- Continue tant qu'il y a au moins 1 session par jour
- S'arrête au premier jour sans session (sauf aujourd'hui, on te donne une chance !)
- Exemple : Si tu as fait des sessions lundi, mardi, mercredi mais pas jeudi (hier) → streak = 0

### Meilleur streak
- Parcourt TOUT l'historique des sessions
- Trouve la plus longue série de jours consécutifs avec au moins 1 session
- Garde ce record même s'il est dans le passé

## Style et responsive

- Utilise Tailwind CSS pour tout le style
- Support du mode sombre (comme le reste de l'app)
- Responsive : le calendrier peut scroller horizontalement sur mobile
- Effet hover : les carrés grossissent au survol
- Tooltip personnalisé qui suit la souris

## Comment tester

1. Lance l'app : `npm run dev`
2. Va sur http://localhost:3001/Pomodoro/
3. Scrolle jusqu'à la section "Statistiques"
4. Tu verras le nouveau calendrier en dessous des stats jour/semaine
5. Survole les carrés pour voir les détails

## Pour voir des données

Si tu n'as pas encore d'historique :
1. Complète quelques sessions Pomodoro
2. Les sessions de **travail** (pas les pauses) comptent dans les streaks
3. Le calendrier se mettra à jour automatiquement

