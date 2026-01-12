import React, { useState, useEffect, useRef } from 'react'
import { usePomodoro } from '../../context/PomodoroContext'

// Le champ pour écrire ce qu'on est en train de faire
const TaskInput = () => {
  const { currentTask, updateCurrentTask, isRunning, isDark } = usePomodoro()
  const [localValue, setLocalValue] = useState(currentTask)
  const debounceRef = useRef(null)

  // Quand la tâche change ailleurs, on met à jour ici
  useEffect(() => {
    setLocalValue(currentTask)
  }, [currentTask])

  // Quand on tape dans le champ
  const handleChange = (e) => {
    const value = e.target.value
    setLocalValue(value)

    // On attend un peu avant de sauvegarder (pour pas sauvegarder à chaque lettre)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // On sauvegarde après 300ms sans rien taper
    debounceRef.current = setTimeout(() => {
      updateCurrentTask(value)
    }, 300)
  }

  // Quand le composant disparaît, on nettoie le timer
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-md">
      <label htmlFor="task-input" className={`block text-sm font-medium mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Tâche en cours
      </label>
      <input
        id="task-input"
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Qu'allez-vous travailler ?"
        className={`
          w-full px-4 py-3 rounded-lg
          placeholder-gray-400
          border-2 border-transparent
          transition-all duration-200
          shadow-lg
          font-medium
          ${isDark
            ? 'bg-gray-800 text-white focus:border-gray-600'
            : 'bg-white text-gray-800 focus:border-gray-300'
          }
        `}
        maxLength={100}
      />
      {isRunning && (
        <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          💡 Restez concentré sur : {currentTask || 'Votre tâche'}
        </p>
      )}
    </div>
  )
}

export default TaskInput
