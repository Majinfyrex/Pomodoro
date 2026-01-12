import { useMemo } from 'react'
import { getSessions } from '../utils/storage'
import { getDateString, getLastNDays, isSameDay } from '../utils/time'
import { SESSION_TYPES } from '../utils/constants'

/**
 * Hook pour calculer les statistiques des sessions
 * @returns {Object} Statistiques calculées
 */
export const useStats = () => {
  const sessions = getSessions()

  /**
   * Sessions du jour
   */
  const todaySessions = useMemo(() => {
    const today = getDateString()
    return sessions.filter(session => session.date === today)
  }, [sessions])

  /**
   * Sessions de travail du jour
   */
  const todayWorkSessions = useMemo(() => {
    return todaySessions.filter(session => session.type === SESSION_TYPES.WORK)
  }, [todaySessions])

  /**
   * Durée totale de travail aujourd'hui (en minutes)
   */
  const todayTotalMinutes = useMemo(() => {
    return todayWorkSessions.reduce((total, session) => total + session.duration, 0)
  }, [todayWorkSessions])

  /**
   * Sessions de la semaine (7 derniers jours)
   */
  const weeklySessions = useMemo(() => {
    const last7Days = getLastNDays(7)
    return sessions.filter(session => last7Days.includes(session.date))
  }, [sessions])

  /**
   * Sessions de travail de la semaine
   */
  const weeklyWorkSessions = useMemo(() => {
    return weeklySessions.filter(session => session.type === SESSION_TYPES.WORK)
  }, [weeklySessions])

  /**
   * Durée totale de travail cette semaine (en minutes)
   */
  const weeklyTotalMinutes = useMemo(() => {
    return weeklyWorkSessions.reduce((total, session) => total + session.duration, 0)
  }, [weeklyWorkSessions])

  /**
   * Statistiques par jour pour les 7 derniers jours
   */
  const dailyStats = useMemo(() => {
    const last7Days = getLastNDays(7)

    return last7Days.map(date => {
      const daySessions = sessions.filter(session => session.date === date)
      const workSessions = daySessions.filter(session => session.type === SESSION_TYPES.WORK)
      const totalMinutes = workSessions.reduce((total, session) => total + session.duration, 0)

      return {
        date,
        count: workSessions.length,
        totalMinutes,
        isToday: isSameDay(date, new Date()),
      }
    })
  }, [sessions])

  /**
   * Calcule les statistiques pour un type de session spécifique
   */
  const getSessionsByType = (type) => {
    return sessions.filter(session => session.type === type)
  }

  /**
   * Moyenne de sessions par jour cette semaine
   */
  const weeklyAverage = useMemo(() => {
    return Math.round(weeklyWorkSessions.length / 7 * 10) / 10
  }, [weeklyWorkSessions])

  /**
   * Meilleur jour de la semaine (le plus de sessions)
   */
  const bestDay = useMemo(() => {
    if (dailyStats.length === 0) return null

    return dailyStats.reduce((best, current) => {
      return current.count > best.count ? current : best
    }, dailyStats[0])
  }, [dailyStats])

  return {
    // Sessions
    todaySessions,
    todayWorkSessions,
    weeklySessions,
    weeklyWorkSessions,

    // Durées
    todayTotalMinutes,
    weeklyTotalMinutes,

    // Statistiques détaillées
    dailyStats,
    weeklyAverage,
    bestDay,

    // Fonctions utilitaires
    getSessionsByType,
  }
}
