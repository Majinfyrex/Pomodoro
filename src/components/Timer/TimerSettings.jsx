import React, { useState } from 'react'
import { usePomodoro } from '../../context/PomodoroContext'
import { LIMITS } from '../../utils/constants'

// Le modal pour changer les paramètres
const TimerSettings = () => {
  const { settings, updateSettings, isSettingsOpen, closeSettings, isDark } = usePomodoro()

  const [localSettings, setLocalSettings] = useState(settings)
  const [errors, setErrors] = useState({})

  if (!isSettingsOpen) return null

  // Vérifier qu'une durée est valide (entre 1 et 60 minutes)
  const validateDuration = (name, value) => {
    const numValue = parseInt(value)

    if (isNaN(numValue)) {
      return 'Veuillez entrer un nombre'
    }

    if (numValue < LIMITS.minDuration) {
      return `Minimum ${LIMITS.minDuration} minute`
    }

    if (numValue > LIMITS.maxDuration) {
      return `Maximum ${LIMITS.maxDuration} minutes`
    }

    return null
  }

  // Quand on change un champ dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target

    // Pour le volume, on garde les décimales
    if (name === 'volume') {
      setLocalSettings(prev => ({ ...prev, [name]: parseFloat(value) }))
    } else {
      setLocalSettings(prev => ({ ...prev, [name]: parseInt(value) || '' }))

      // Vérifier si la durée est valide
      const error = validateDuration(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Sauvegarder les nouveaux paramètres
  const handleSave = () => {
    // On vérifie que tout est bon
    const newErrors = {}
    Object.keys(localSettings).forEach(key => {
      // On ne valide pas le volume (c'est un slider, donc toujours valide)
      if (key !== 'volume') {
        const error = validateDuration(key, localSettings[key])
        if (error) {
          newErrors[key] = error
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Tout est bon, on sauvegarde !
    updateSettings(localSettings)
    closeSettings()
  }

  // Annuler et fermer sans sauvegarder
  const handleCancel = () => {
    setLocalSettings(settings)
    setErrors({})
    closeSettings()
  }

  // Fermer si on clique en dehors du modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className={`rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Paramètres
          </h2>
          <button
            onClick={handleCancel}
            className={`transition-colors ${
              isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <div className="space-y-4">
          {/* Durée de travail */}
          <div>
            <label htmlFor="workDuration" className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Durée de travail (minutes)
            </label>
            <input
              id="workDuration"
              name="workDuration"
              type="number"
              value={localSettings.workDuration}
              onChange={handleChange}
              min={LIMITS.minDuration}
              max={LIMITS.maxDuration}
              className={`
                w-full px-3 py-2 border rounded-lg
                focus:ring-2 focus:ring-purple-500 focus:border-transparent
                transition-all
                ${errors.workDuration
                  ? 'border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }
              `}
            />
            {errors.workDuration && (
              <p className="text-red-500 text-xs mt-1">{errors.workDuration}</p>
            )}
          </div>

          {/* Pause courte */}
          <div>
            <label htmlFor="shortBreakDuration" className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Pause courte (minutes)
            </label>
            <input
              id="shortBreakDuration"
              name="shortBreakDuration"
              type="number"
              value={localSettings.shortBreakDuration}
              onChange={handleChange}
              min={LIMITS.minDuration}
              max={LIMITS.maxDuration}
              className={`
                w-full px-3 py-2 border rounded-lg
                focus:ring-2 focus:ring-green-500 focus:border-transparent
                transition-all
                ${errors.shortBreakDuration
                  ? 'border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }
              `}
            />
            {errors.shortBreakDuration && (
              <p className="text-red-500 text-xs mt-1">{errors.shortBreakDuration}</p>
            )}
          </div>

          {/* Pause longue */}
          <div>
            <label htmlFor="longBreakDuration" className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Pause longue (minutes)
            </label>
            <input
              id="longBreakDuration"
              name="longBreakDuration"
              type="number"
              value={localSettings.longBreakDuration}
              onChange={handleChange}
              min={LIMITS.minDuration}
              max={LIMITS.maxDuration}
              className={`
                w-full px-3 py-2 border rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all
                ${errors.longBreakDuration
                  ? 'border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }
              `}
            />
            {errors.longBreakDuration && (
              <p className="text-red-500 text-xs mt-1">{errors.longBreakDuration}</p>
            )}
          </div>

          {/* Sessions avant pause longue */}
          <div>
            <label htmlFor="sessionsUntilLongBreak" className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Sessions avant pause longue
            </label>
            <input
              id="sessionsUntilLongBreak"
              name="sessionsUntilLongBreak"
              type="number"
              value={localSettings.sessionsUntilLongBreak}
              onChange={handleChange}
              min={2}
              max={10}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Nombre de sessions de travail avant une pause longue
            </p>
          </div>

          {/* Volume du son */}
          <div>
            <label htmlFor="volume" className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Volume du son ({Math.round(localSettings.volume * 100)}%)
            </label>
            <input
              id="volume"
              name="volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={localSettings.volume || 0.5}
              onChange={handleChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 accent-purple-500"
            />
            <div className="flex justify-between text-xs mt-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>🔇 Muet</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>🔊 Fort</span>
            </div>
          </div>
        </div>

        {/* Boutons en bas */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCancel}
            className={`flex-1 px-4 py-2 rounded-lg border font-medium transition-colors ${
              isDark
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerSettings
