import React from 'react'
import { usePomodoro } from '../../context/PomodoroContext'
import { useStats } from '../../hooks/useStats'
import { formatDuration } from '../../utils/time'

// Les stats de la semaine avec un petit graphique
const WeeklyStats = () => {
  const { isDark } = usePomodoro()
  const { dailyStats, weeklyTotalMinutes, weeklyAverage } = useStats()

  // On cherche le jour avec le plus de sessions pour ajuster le graphique
  const maxCount = Math.max(...dailyStats.map(d => d.count), 1)

  // Les initiales des jours (Lundi, Mardi, etc.)
  const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  return (
    <div className={`rounded-lg p-4 shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`font-semibold text-lg mb-3 flex items-center gap-2 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Cette semaine
      </h3>

      {/* Le petit graphique avec des barres */}
      <div className="flex items-end justify-between gap-2 h-24 mb-4">
        {dailyStats.map((day, index) => {
          const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0
          const isToday = day.isToday

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              {/* La barre du jour */}
              <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                <div
                  className={`w-full rounded-t transition-all ${
                    isToday
                      ? isDark ? 'bg-white' : 'bg-gray-900'
                      : day.count > 0
                      ? isDark ? 'bg-gray-600' : 'bg-gray-400'
                      : isDark ? 'bg-gray-700/30' : 'bg-gray-200'
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${day.count} session${day.count > 1 ? 's' : ''}`}
                />
              </div>

              {/* La lettre du jour */}
              <span
                className={`text-xs ${
                  isToday
                    ? (isDark ? 'text-white font-bold' : 'text-gray-900 font-bold')
                    : (isDark ? 'text-gray-400' : 'text-gray-500')
                }`}
              >
                {dayLabels[index]}
              </span>
            </div>
          )
        })}
      </div>

      {/* Résumé de la semaine */}
      <div className={`space-y-2 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Total semaine
          </span>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {formatDuration(weeklyTotalMinutes)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Moyenne/jour
          </span>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {weeklyAverage}
          </span>
        </div>
      </div>
    </div>
  )
}

export default WeeklyStats
