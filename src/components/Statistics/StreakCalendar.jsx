import React, { useState } from 'react'
import { usePomodoro } from '../../context/PomodoroContext'
import { useStreak } from '../../hooks/useStreak'

// Composant pour afficher le calendrier de productivité de l'année 2026
const StreakCalendar = () => {
  const { isDark } = usePomodoro()
  const { calendarData, currentStreak, bestStreak } = useStreak()

  // État pour le tooltip (info qui s'affiche au survol)
  const [tooltip, setTooltip] = useState(null)

  // Fonction pour obtenir la couleur d'un carré selon le nombre de sessions
  const getColor = (count) => {
    if (count === 0) {
      // Pas de session = gris clair
      return isDark ? 'bg-gray-700' : 'bg-gray-200'
    } else if (count <= 2) {
      // 1-2 sessions = vert clair
      return 'bg-green-300'
    } else if (count <= 4) {
      // 3-4 sessions = vert moyen
      return 'bg-green-500'
    } else {
      // 5+ sessions = vert foncé
      return 'bg-green-700'
    }
  }

  // Fonction pour formater la date en français
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Fonction appelée quand on survole un carré
  const handleMouseEnter = (day, event) => {
    setTooltip({
      date: day.date,
      count: day.count,
      x: event.clientX,
      y: event.clientY
    })
  }

  // Fonction appelée quand on quitte un carré
  const handleMouseLeave = () => {
    setTooltip(null)
  }

  return (
    <div className={`rounded-2xl shadow-xl p-6 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Titre */}
      <h3 className={`text-xl font-bold mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Série de productivité 2026
      </h3>

      {/* Statistiques des streaks */}
      <div className="flex gap-6 mb-6">
        <div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Série actuelle
          </p>
          <p className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {currentStreak} {currentStreak <= 1 ? 'jour' : 'jours'}
          </p>
        </div>
        <div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Meilleure série
          </p>
          <p className={`text-3xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            {bestStreak} {bestStreak <= 1 ? 'jour' : 'jours'}
          </p>
        </div>
      </div>

      {/* Légende des couleurs */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Moins
        </span>
        <div className={`w-3 h-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className="w-3 h-3 rounded bg-green-300"></div>
        <div className="w-3 h-3 rounded bg-green-500"></div>
        <div className="w-3 h-3 rounded bg-green-700"></div>
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Plus
        </span>
      </div>

      {/* Calendrier avec les petits carrés */}
      <div className="overflow-x-auto">
        <div className="flex flex-wrap gap-1">
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded transition-transform hover:scale-150 cursor-pointer ${getColor(day.count)}`}
              onMouseEnter={(e) => handleMouseEnter(day, e)}
              onMouseLeave={handleMouseLeave}
              title={`${formatDate(day.date)}: ${day.count} session${day.count > 1 ? 's' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Tooltip personnalisé (s'affiche au survol) */}
      {tooltip && (
        <div
          className={`fixed z-50 px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none ${
            isDark ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'
          }`}
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y - 40}px`,
          }}
        >
          <p className="font-medium">{formatDate(tooltip.date)}</p>
          <p className="text-xs opacity-80">
            {tooltip.count} session{tooltip.count > 1 ? 's' : ''} de travail
          </p>
        </div>
      )}

      {/* Message d'encouragement */}
      <p className={`text-sm mt-4 text-center ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {currentStreak > 0
          ? `Continue comme ça ! Tu es sur une série de ${currentStreak} jour${currentStreak > 1 ? 's' : ''} !`
          : 'Commence une nouvelle série dès aujourd\'hui !'
        }
      </p>
    </div>
  )
}

export default StreakCalendar
