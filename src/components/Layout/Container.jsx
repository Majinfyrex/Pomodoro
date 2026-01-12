import React from 'react'
import { usePomodoro } from '../../context/PomodoroContext'

// Le conteneur principal de l'appli
const Container = ({ children }) => {
  const { isDark } = usePomodoro()

  return (
    // Fond blanc en mode clair, fond sombre en mode dark
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-gray-900'
        : 'bg-gray-50'
    }`}>
      {children}
    </div>
  )
}

export default Container
