import { useMemo } from 'react'
import { getSessions } from '../utils/storage'
import { getLastNDays, getDateString } from '../utils/time'

// Hook pour calculer les streaks (séries de jours consécutifs)
export const useStreak = () => {
  // On récupère toutes les sessions sauvegardées
  const sessions = getSessions()

  // useMemo pour éviter de recalculer à chaque rendu
  const streakData = useMemo(() => {
    // On calcule les jours depuis le 1er janvier 2026 jusqu'à aujourd'hui
    const startOf2026 = new Date('2026-01-01')
    const todayDate = new Date()

    // Calculer le nombre de jours depuis le début de 2026
    let daysInYear = Math.ceil((todayDate - startOf2026) / (1000 * 60 * 60 * 24)) + 1

    // S'assurer que le nombre est positif (au cas où on serait avant 2026)
    if (daysInYear < 1) {
      daysInYear = 1
    }

    // S'assurer qu'on ne dépasse pas 365 jours
    if (daysInYear > 365) {
      daysInYear = 365
    }

    // On prend tous les jours de 2026 jusqu'à aujourd'hui
    const daysOf2026 = getLastNDays(daysInYear)

    // On compte le nombre de sessions pour chaque jour
    const sessionsPerDay = {}

    sessions.forEach(session => {
      const date = session.date // Format: 'YYYY-MM-DD'

      // On ne compte que les sessions de travail (pas les pauses)
      if (session.type === 'work') {
        if (!sessionsPerDay[date]) {
          sessionsPerDay[date] = 0
        }
        sessionsPerDay[date]++
      }
    })

    // On crée un tableau avec les infos pour chaque jour
    const calendarData = daysOf2026.map(date => ({
      date,
      count: sessionsPerDay[date] || 0
    }))

    // Calculer le streak actuel (jours consécutifs depuis aujourd'hui)
    let currentStreak = 0
    const todayString = getDateString(todayDate)

    // On commence par aujourd'hui et on remonte dans le temps
    for (let i = 0; i < calendarData.length; i++) {
      const day = calendarData[i]

      // Si ce jour a au moins 1 session, on continue le streak
      if (day.count > 0) {
        currentStreak++
      } else {
        // Si on trouve un jour sans session, on arrête
        // SAUF si c'est aujourd'hui (on donne une chance !)
        if (day.date !== todayString) {
          break
        }
      }
    }

    // Calculer le meilleur streak (record de tous les temps)
    let bestStreak = 0
    let tempStreak = 0

    // On parcourt toutes les sessions pour trouver le meilleur streak
    const allDates = [...new Set(sessions.map(s => s.date))].sort()

    for (let i = 0; i < allDates.length; i++) {
      const currentDate = allDates[i]
      const sessionsOnDate = sessions.filter(s => s.date === currentDate && s.type === 'work').length

      if (sessionsOnDate > 0) {
        tempStreak++

        // Vérifier si le jour suivant est consécutif
        if (i < allDates.length - 1) {
          const nextDate = allDates[i + 1]
          const current = new Date(currentDate)
          const next = new Date(nextDate)
          const diffInDays = Math.round((next - current) / (1000 * 60 * 60 * 24))

          // Si le jour suivant n'est pas le lendemain, on reset le streak
          if (diffInDays > 1) {
            bestStreak = Math.max(bestStreak, tempStreak)
            tempStreak = 0
          }
        }
      }
    }

    // On n'oublie pas de vérifier le dernier streak
    bestStreak = Math.max(bestStreak, tempStreak)

    return {
      calendarData,
      currentStreak,
      bestStreak,
    }
  }, [sessions])

  return streakData
}
