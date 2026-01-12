import { useState, useEffect } from 'react'

// Hook simple pour gérer le thème clair/sombre
export const useTheme = () => {
  // On regarde si l'utilisateur a déjà choisi un thème
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    // Si y'a rien de sauvegardé, on prend le thème clair par défaut
    return saved ? saved === 'dark' : false
  })

  // Quand le thème change, on le sauvegarde
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    // On ajoute ou enlève la classe 'dark' sur le body
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  // Fonction pour changer de thème
  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return { isDark, toggleTheme }
}
