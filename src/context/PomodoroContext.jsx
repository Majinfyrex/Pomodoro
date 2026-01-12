import React, { createContext, useContext, useState } from 'react'
import { getSettings, saveSettings, getCurrentTask, saveCurrentTask } from '../utils/storage'
import { useTimer } from '../hooks/useTimer'
import { useTheme } from '../hooks/useTheme'

// On crée un contexte pour partager les données entre tous les composants
const PomodoroContext = createContext(null)

// C'est ici qu'on gère toutes les données de l'appli
export const PomodoroProvider = ({ children }) => {
  // Les paramètres du timer (combien de temps pour chaque session)
  const [settings, setSettings] = useState(() => getSettings())

  // Ce que l'utilisateur est en train de faire
  const [currentTask, setCurrentTask] = useState(() => {
    const task = getCurrentTask()
    return task?.text || ''
  })

  // Est-ce que la fenêtre des paramètres est ouverte ?
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Le timer fait tout le travail du compte à rebours
  const timer = useTimer(settings, currentTask)

  // Gestion du thème clair/sombre
  const { isDark, toggleTheme } = useTheme()

  // Fonction pour changer les paramètres
  const updateSettings = (newSettings) => {
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  // Fonction pour changer la tâche en cours
  const updateCurrentTask = (text) => {
    setCurrentTask(text)
    saveCurrentTask(text)
  }

  // Ouvrir les paramètres (seulement si le timer est arrêté)
  const openSettings = () => {
    if (timer.isIdle || timer.isPaused) {
      setIsSettingsOpen(true)
    }
  }

  // Fermer les paramètres
  const closeSettings = () => {
    setIsSettingsOpen(false)
  }

  // On met tout ça ensemble pour le partager avec l'appli
  const value = {
    // Les paramètres
    settings,
    updateSettings,
    isSettingsOpen,
    openSettings,
    closeSettings,

    // La tâche
    currentTask,
    updateCurrentTask,

    // Le thème
    isDark,
    toggleTheme,

    // Le timer (tout ce qui concerne le compte à rebours)
    ...timer,
  }

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  )
}

// Hook pour utiliser les données du Pomodoro dans n'importe quel composant
export const usePomodoro = () => {
  const context = useContext(PomodoroContext)

  // Si on est pas dans le Provider, ça va pas marcher !
  if (!context) {
    throw new Error('usePomodoro doit être utilisé à l\'intérieur d\'un PomodoroProvider')
  }

  return context
}
