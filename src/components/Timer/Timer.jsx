import React from 'react'
import { usePomodoro } from '../../context/PomodoroContext'
import { formatTime } from '../../utils/time'
import { SESSION_TYPES } from '../../utils/constants'

// Le timer principal avec le cercle qui tourne
const Timer = () => {
  const { timeRemaining, progress, currentSessionType, sessionLabel, isRunning, isDark } = usePomodoro()

  // Les couleurs changent selon ce qu'on fait (travail ou pause)
  const colors = {
    [SESSION_TYPES.WORK]: {
      ring: 'stroke-red-500',
      bg: isDark ? 'bg-red-900/20' : 'bg-red-500/10',
      badge: 'bg-red-500',
    },
    [SESSION_TYPES.SHORT_BREAK]: {
      ring: 'stroke-green-500',
      bg: isDark ? 'bg-green-900/20' : 'bg-green-500/10',
      badge: 'bg-green-500',
    },
    [SESSION_TYPES.LONG_BREAK]: {
      ring: 'stroke-blue-500',
      bg: isDark ? 'bg-blue-900/20' : 'bg-blue-500/10',
      badge: 'bg-blue-500',
    },
  }

  const currentColors = colors[currentSessionType]

  // Calcul pour dessiner le cercle (plus petit sur mobile)
  const size = window.innerWidth < 640 ? 250 : 300
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Le petit badge qui dit si on travaille ou on fait une pause */}
      <div className={`${currentColors.badge} px-4 py-2 rounded-full shadow-lg`}>
        <span className="text-white font-semibold text-sm uppercase tracking-wide">
          {sessionLabel}
        </span>
      </div>

      {/* Le grand cercle avec le temps */}
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Le cercle gris du fond */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className={isDark ? 'stroke-gray-700' : 'stroke-gray-200'}
            fill="none"
          />

          {/* Le cercle de couleur qui avance */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${currentColors.ring} transition-all duration-300 ${
              isRunning ? 'animate-pulse-slow' : ''
            }`}
            fill="none"
          />
        </svg>

        {/* Le temps qui reste au milieu */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${currentColors.bg} rounded-full p-8 sm:p-12`}>
            <span className={`text-5xl sm:text-6xl font-bold tabular-nums ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer
