import { useState, useEffect, useCallback } from 'react'

// Hook pour gérer les notifications (son + popup navigateur)
export const useNotification = (volume = 0.5) => {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  )
  const [audioEnabled, setAudioEnabled] = useState(true)

  useEffect(() => {
    // On vérifie si le navigateur supporte les notifications
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission)
    }
  }, [])

  // Demander la permission pour afficher des notifications
  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') {
      console.warn('Les notifications ne sont pas supportées par ce navigateur')
      return false
    }

    // Si on a déjà la permission, pas besoin de redemander
    if (Notification.permission === 'granted') {
      return true
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error)
      return false
    }
  }, [])

  // Afficher une popup de notification dans le navigateur
  const showNotification = useCallback((title, body) => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') {
      return
    }

    try {
      const notification = new Notification(title, {
        body,
        icon: '/vite.svg',
        badge: '/vite.svg',
        tag: 'pomodoro-timer',
        requireInteraction: false,
        silent: false,
      })

      // La notification se ferme toute seule après 5 secondes
      setTimeout(() => notification.close(), 5000)
    } catch (error) {
      console.error('Erreur lors de l\'affichage de la notification:', error)
    }
  }, [])

  // Jouer le son de notification
  const playSound = useCallback(() => {
    if (!audioEnabled) return

    try {
      const audio = new Audio('/notification.mp3')
      // On utilise le volume choisi par l'utilisateur (entre 0 et 1)
      audio.volume = volume
      audio.play().catch(error => {
        console.error('Erreur lors de la lecture du son:', error)
      })
    } catch (error) {
      console.error('Erreur lors de la création de l\'audio:', error)
    }
  }, [audioEnabled, volume])

  // Tout en un : son + notification
  const notify = useCallback((title, body) => {
    playSound()
    showNotification(title, body)
  }, [playSound, showNotification])

  return {
    permission,
    audioEnabled,
    setAudioEnabled,
    requestPermission,
    showNotification,
    playSound,
    notify,
  }
}
