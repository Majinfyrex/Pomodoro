import { STORAGE_KEYS, DEFAULT_DURATIONS, DEFAULT_VOLUME, LIMITS } from './constants'

/**
 * Récupère une valeur du localStorage avec gestion d'erreur
 * @param {string} key - Clé localStorage
 * @param {*} defaultValue - Valeur par défaut si la clé n'existe pas
 * @returns {*} Valeur parsée ou valeur par défaut
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${key}:`, error)
    return defaultValue
  }
}

/**
 * Sauvegarde une valeur dans le localStorage avec gestion d'erreur
 * @param {string} key - Clé localStorage
 * @param {*} value - Valeur à sauvegarder
 * @returns {boolean} true si succès, false sinon
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Erreur lors de l'écriture de ${key}:`, error)

    // Si quota dépassé, tenter de nettoyer l'historique
    if (error.name === 'QuotaExceededError') {
      console.warn('Quota localStorage dépassé, nettoyage en cours...')
      cleanOldSessions()

      // Réessayer
      try {
        localStorage.setItem(key, JSON.stringify(value))
        return true
      } catch (retryError) {
        console.error('Échec après nettoyage:', retryError)
        return false
      }
    }

    return false
  }
}

/**
 * Supprime une clé du localStorage
 * @param {string} key - Clé à supprimer
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Erreur lors de la suppression de ${key}:`, error)
  }
}

// Récupérer les paramètres (durées + volume)
export const getSettings = () => {
  return getItem(STORAGE_KEYS.settings, {
    workDuration: DEFAULT_DURATIONS.work,
    shortBreakDuration: DEFAULT_DURATIONS.shortBreak,
    longBreakDuration: DEFAULT_DURATIONS.longBreak,
    sessionsUntilLongBreak: DEFAULT_DURATIONS.sessionsUntilLongBreak,
    volume: DEFAULT_VOLUME,
  })
}

/**
 * Sauvegarde les paramètres de l'application
 * @param {Object} settings - Paramètres à sauvegarder
 */
export const saveSettings = (settings) => {
  setItem(STORAGE_KEYS.settings, settings)
}

/**
 * Récupère la tâche en cours
 * @returns {Object|null} Tâche en cours ou null
 */
export const getCurrentTask = () => {
  return getItem(STORAGE_KEYS.currentTask, null)
}

/**
 * Sauvegarde la tâche en cours
 * @param {string} text - Texte de la tâche
 */
export const saveCurrentTask = (text) => {
  setItem(STORAGE_KEYS.currentTask, {
    text,
    startedAt: new Date().toISOString(),
  })
}

/**
 * Récupère l'historique des sessions
 * @returns {Array} Tableau de sessions
 */
export const getSessions = () => {
  return getItem(STORAGE_KEYS.sessions, [])
}

/**
 * Ajoute une nouvelle session à l'historique
 * @param {Object} session - Session à ajouter
 */
export const addSession = (session) => {
  const sessions = getSessions()
  const newSession = {
    id: crypto.randomUUID(),
    ...session,
    completedAt: new Date().toISOString(),
    date: new Date().toISOString().split('T')[0],
  }

  sessions.push(newSession)

  // Limiter la taille de l'historique
  if (sessions.length > LIMITS.maxSessionsHistory) {
    sessions.shift() // Supprimer la plus ancienne
  }

  setItem(STORAGE_KEYS.sessions, sessions)
}

/**
 * Nettoie les anciennes sessions (garde les 30 derniers jours)
 */
export const cleanOldSessions = () => {
  const sessions = getSessions()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentSessions = sessions.filter(session => {
    const sessionDate = new Date(session.completedAt)
    return sessionDate > thirtyDaysAgo
  })

  setItem(STORAGE_KEYS.sessions, recentSessions)
}

/**
 * Récupère l'état de l'application
 * @returns {Object} État de l'application
 */
export const getAppState = () => {
  return getItem(STORAGE_KEYS.appState, {
    lastSessionType: null,
    sessionCount: 0,
    theme: 'default',
  })
}

/**
 * Sauvegarde l'état de l'application
 * @param {Object} state - État à sauvegarder
 */
export const saveAppState = (state) => {
  setItem(STORAGE_KEYS.appState, state)
}

/**
 * Réinitialise toutes les données de l'application
 */
export const resetAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeItem(key)
  })
}
