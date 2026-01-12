import React from 'react'
import { usePomodoro } from '../../context/PomodoroContext'

// Les boutons pour contrôler le timer
const TimerControls = () => {
  const {
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    isRunning,
    isPaused,
    isIdle,
    isDark,
  } = usePomodoro()

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* Le gros bouton pour démarrer */}
      {(isIdle || isPaused) && (
        <button
          onClick={startTimer}
          className={`
            px-6 py-3 sm:px-8 sm:py-4 rounded-full
            font-bold text-base sm:text-lg
            shadow-lg hover:shadow-xl
            hover:scale-105 active:scale-95
            transition-all duration-200
            flex items-center gap-2
            ${isDark
              ? 'bg-white text-gray-900'
              : 'bg-gray-900 text-white'}
          `}
          aria-label={isIdle ? 'Démarrer le timer' : 'Reprendre le timer'}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          {isIdle ? 'Démarrer' : 'Reprendre'}
        </button>
      )}

      {/* Le bouton pause quand ça tourne */}
      {isRunning && (
        <button
          onClick={pauseTimer}
          className={`
            px-6 py-3 sm:px-8 sm:py-4 rounded-full
            font-bold text-base sm:text-lg
            shadow-lg hover:shadow-xl
            hover:scale-105 active:scale-95
            transition-all duration-200
            flex items-center gap-2
            ${isDark
              ? 'bg-white text-gray-900'
              : 'bg-gray-900 text-white'}
          `}
          aria-label="Mettre en pause"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Pause
        </button>
      )}

      {/* Bouton pour tout remettre à zéro */}
      {!isIdle && (
        <button
          onClick={resetTimer}
          className={`
            px-6 py-3 rounded-full
            font-semibold
            hover:scale-105 active:scale-95
            transition-all duration-200
            flex items-center gap-2
            ${isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
          aria-label="Réinitialiser"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </button>
      )}

      {/* Bouton pour sauter à la session suivante */}
      <button
        onClick={skipSession}
        className={`
          px-6 py-3 rounded-full
          font-semibold
          hover:scale-105 active:scale-95
          transition-all duration-200
          flex items-center gap-2
          ${isDark
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
        `}
        aria-label="Passer à la session suivante"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
        Passer
      </button>
    </div>
  )
}

export default TimerControls
