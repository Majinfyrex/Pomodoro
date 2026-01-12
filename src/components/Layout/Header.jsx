import React from 'react'
import { usePomodoro } from '../../context/PomodoroContext'

// La barre du haut avec le logo et les boutons
const Header = () => {
  const { openSettings, isRunning, isDark, toggleTheme } = usePomodoro()

  return (
    <header className={`w-full max-w-4xl mx-auto px-4 py-6 flex justify-between items-center ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      {/* Logo et titre */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <span className="text-xl sm:text-2xl">🍅</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">Pomodoro</h1>
      </div>

      {/* Boutons à droite */}
      <div className="flex gap-2">
        {/* Bouton pour changer le thème clair/sombre */}
        <button
          onClick={toggleTheme}
          className={`
            px-3 py-2 rounded-lg font-medium
            transition-all duration-200 flex items-center gap-2
            ${isDark
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-100'
            }
            shadow-lg active:scale-95
          `}
          aria-label="Changer le thème"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Bouton paramètres */}
        <button
          onClick={openSettings}
          disabled={isRunning}
          className={`
            px-3 py-2 sm:px-4 rounded-lg font-medium
            transition-all duration-200 flex items-center gap-2
            ${isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isDark
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-100'
            }
            shadow-lg active:scale-95
          `}
          aria-label="Ouvrir les paramètres"
        >
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
