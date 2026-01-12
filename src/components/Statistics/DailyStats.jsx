import React from 'react'
import { usePomodoro } from '../../context/PomodoroContext'
import { useStats } from '../../hooks/useStats'
import { formatDuration } from '../../utils/time'

// Les stats de la journée
const DailyStats = () => {
  const { isDark } = usePomodoro()
  const { todayWorkSessions, todayTotalMinutes } = useStats()

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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Aujourd'hui
      </h3>

      <div className="space-y-3">
        {/* Combien de sessions aujourd'hui */}
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Sessions complétées
          </span>
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {todayWorkSessions.length}
          </span>
        </div>

        {/* Temps total travaillé */}
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Temps de travail
          </span>
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {formatDuration(todayTotalMinutes)}
          </span>
        </div>

        {/* Petit message selon le nombre de sessions */}
        {todayWorkSessions.length === 0 && (
          <p className={`text-sm text-center mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Commencez votre première session !
          </p>
        )}

        {todayWorkSessions.length > 0 && (
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {todayWorkSessions.length >= 4
                ? '🎉 Excellent travail aujourd\'hui !'
                : todayWorkSessions.length >= 2
                ? '👍 Bon rythme, continuez !'
                : '💪 C\'est un bon début !'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyStats
