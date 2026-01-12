import { useState, useEffect, useCallback, useRef } from 'react'
import { TIMER_STATES, SESSION_TYPES, SESSION_LABELS } from '../utils/constants'
import { minutesToSeconds } from '../utils/time'
import { addSession, getAppState, saveAppState } from '../utils/storage'
import { useNotification } from './useNotification'

/**
 * Hook principal pour gérer le timer Pomodoro
 * @param {Object} settings - Paramètres du timer
 * @param {string} currentTask - Tâche en cours
 * @returns {Object} État et fonctions du timer
 */
export const useTimer = (settings, currentTask) => {
  // On passe le volume aux notifications
  const { notify, requestPermission } = useNotification(settings.volume || 0.5)

  // État de l'application
  const [appState, setAppState] = useState(() => getAppState())

  // État du timer
  const [timerState, setTimerState] = useState(TIMER_STATES.IDLE)
  const [currentSessionType, setCurrentSessionType] = useState(SESSION_TYPES.WORK)
  const [timeRemaining, setTimeRemaining] = useState(() =>
    minutesToSeconds(settings.workDuration)
  )

  // Référence pour l'intervalle
  const intervalRef = useRef(null)

  /**
   * Détermine le type de la prochaine session
   */
  const getNextSessionType = useCallback(() => {
    if (currentSessionType === SESSION_TYPES.WORK) {
      // Après une session de travail
      if (appState.sessionCount >= settings.sessionsUntilLongBreak - 1) {
        return SESSION_TYPES.LONG_BREAK
      }
      return SESSION_TYPES.SHORT_BREAK
    } else {
      // Après une pause, retour au travail
      return SESSION_TYPES.WORK
    }
  }, [currentSessionType, appState.sessionCount, settings.sessionsUntilLongBreak])

  /**
   * Obtient la durée initiale pour un type de session
   */
  const getSessionDuration = useCallback((sessionType) => {
    switch (sessionType) {
      case SESSION_TYPES.WORK:
        return settings.workDuration
      case SESSION_TYPES.SHORT_BREAK:
        return settings.shortBreakDuration
      case SESSION_TYPES.LONG_BREAK:
        return settings.longBreakDuration
      default:
        return settings.workDuration
    }
  }, [settings])

  /**
   * Démarre le timer
   */
  const startTimer = useCallback(async () => {
    // Demander la permission pour les notifications au premier démarrage
    if (timerState === TIMER_STATES.IDLE) {
      await requestPermission()
    }

    setTimerState(TIMER_STATES.RUNNING)
  }, [timerState, requestPermission])

  /**
   * Met le timer en pause
   */
  const pauseTimer = useCallback(() => {
    setTimerState(TIMER_STATES.PAUSED)
  }, [])

  /**
   * Réinitialise le timer
   */
  const resetTimer = useCallback(() => {
    setTimerState(TIMER_STATES.IDLE)
    setTimeRemaining(minutesToSeconds(getSessionDuration(currentSessionType)))
  }, [currentSessionType, getSessionDuration])

  /**
   * Passe à la session suivante
   */
  const skipSession = useCallback(() => {
    const nextType = getNextSessionType()
    const duration = getSessionDuration(nextType)

    setCurrentSessionType(nextType)
    setTimeRemaining(minutesToSeconds(duration))
    setTimerState(TIMER_STATES.IDLE)

    // Mettre à jour le compteur de sessions
    if (currentSessionType === SESSION_TYPES.WORK) {
      const newCount = appState.sessionCount + 1
      const updatedState = {
        ...appState,
        sessionCount: newCount >= settings.sessionsUntilLongBreak ? 0 : newCount,
        lastSessionType: currentSessionType,
      }
      setAppState(updatedState)
      saveAppState(updatedState)
    } else if (nextType === SESSION_TYPES.WORK) {
      // Réinitialiser si on revient au travail après une longue pause
      if (currentSessionType === SESSION_TYPES.LONG_BREAK) {
        const updatedState = {
          ...appState,
          sessionCount: 0,
          lastSessionType: currentSessionType,
        }
        setAppState(updatedState)
        saveAppState(updatedState)
      }
    }
  }, [
    currentSessionType,
    getNextSessionType,
    getSessionDuration,
    appState,
    settings.sessionsUntilLongBreak,
  ])

  /**
   * Complète la session en cours
   */
  const completeSession = useCallback(() => {
    setTimerState(TIMER_STATES.COMPLETED)

    // Sauvegarder la session dans l'historique
    addSession({
      task: currentTask || 'Sans titre',
      type: currentSessionType,
      duration: getSessionDuration(currentSessionType),
    })

    // Afficher une notification
    const sessionLabel = SESSION_LABELS[currentSessionType]
    notify(
      'Session terminée !',
      `${sessionLabel} complété${currentSessionType === SESSION_TYPES.WORK ? 'e' : ''} avec succès`
    )

    // Préparer la session suivante après un court délai
    setTimeout(() => {
      skipSession()
    }, 1000)
  }, [currentSessionType, currentTask, getSessionDuration, notify, skipSession])

  /**
   * Effet pour gérer le compte à rebours
   */
  useEffect(() => {
    if (timerState === TIMER_STATES.RUNNING) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            completeSession()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState, completeSession])

  /**
   * Effet pour mettre à jour le timer quand les settings changent (seulement si IDLE)
   */
  useEffect(() => {
    if (timerState === TIMER_STATES.IDLE) {
      setTimeRemaining(minutesToSeconds(getSessionDuration(currentSessionType)))
    }
  }, [settings, currentSessionType, timerState, getSessionDuration])

  /**
   * Calcule le pourcentage de progression
   */
  const progress = useMemo(() => {
    const totalSeconds = minutesToSeconds(getSessionDuration(currentSessionType))
    return ((totalSeconds - timeRemaining) / totalSeconds) * 100
  }, [timeRemaining, currentSessionType, getSessionDuration])

  return {
    // État
    timerState,
    currentSessionType,
    timeRemaining,
    progress,
    sessionCount: appState.sessionCount,

    // Actions
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,

    // Informations
    isRunning: timerState === TIMER_STATES.RUNNING,
    isPaused: timerState === TIMER_STATES.PAUSED,
    isIdle: timerState === TIMER_STATES.IDLE,
    sessionLabel: SESSION_LABELS[currentSessionType],
  }
}

// Nécessaire pour useMemo
import { useMemo } from 'react'
