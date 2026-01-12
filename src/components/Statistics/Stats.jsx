import React from 'react'
import { usePomodoro } from '../../context/PomodoroContext'
import DailyStats from './DailyStats'
import WeeklyStats from './WeeklyStats'

// Le bloc avec toutes les statistiques
const Stats = () => {
  const { isDark } = usePomodoro()

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-bold mb-6 text-center ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Statistiques
      </h2>

      {/* Les deux cartes côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyStats />
        <WeeklyStats />
      </div>
    </div>
  )
}

export default Stats
