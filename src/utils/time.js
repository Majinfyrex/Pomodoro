/**
 * Formate un nombre de secondes en format MM:SS
 * @param {number} seconds - Nombre de secondes
 * @returns {string} Temps formaté (ex: "25:00", "05:30")
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Convertit des minutes en secondes
 * @param {number} minutes - Nombre de minutes
 * @returns {number} Nombre de secondes
 */
export const minutesToSeconds = (minutes) => minutes * 60

/**
 * Convertit des secondes en minutes
 * @param {number} seconds - Nombre de secondes
 * @returns {number} Nombre de minutes
 */
export const secondsToMinutes = (seconds) => Math.floor(seconds / 60)

/**
 * Retourne la date du jour au format YYYY-MM-DD
 * @param {Date} [date=new Date()] - Date à formater
 * @returns {string} Date formatée (ex: "2026-01-12")
 */
export const getDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0]
}

/**
 * Vérifie si deux dates sont le même jour
 * @param {string|Date} date1 - Première date
 * @param {string|Date} date2 - Deuxième date
 * @returns {boolean} true si les dates sont le même jour
 */
export const isSameDay = (date1, date2) => {
  const d1 = typeof date1 === 'string' ? date1 : getDateString(date1)
  const d2 = typeof date2 === 'string' ? date2 : getDateString(date2)
  return d1 === d2
}

/**
 * Retourne les N derniers jours à partir d'aujourd'hui
 * @param {number} days - Nombre de jours
 * @returns {string[]} Tableau de dates formatées
 */
export const getLastNDays = (days) => {
  const dates = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    dates.push(getDateString(date))
  }

  return dates
}

/**
 * Formate une durée en minutes en texte lisible
 * @param {number} minutes - Durée en minutes
 * @returns {string} Texte formaté (ex: "1h 30min", "45min")
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}min`
  }

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (mins === 0) {
    return `${hours}h`
  }

  return `${hours}h ${mins}min`
}
