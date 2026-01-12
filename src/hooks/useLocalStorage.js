import { useState, useEffect } from 'react'
import { getItem, setItem } from '../utils/storage'

/**
 * Hook personnalisé pour synchroniser un état React avec localStorage
 * @param {string} key - Clé localStorage
 * @param {*} defaultValue - Valeur par défaut
 * @returns {[*, Function]} Tuple [value, setValue]
 */
export const useLocalStorage = (key, defaultValue) => {
  // Initialiser l'état avec la valeur du localStorage ou la valeur par défaut
  const [value, setValue] = useState(() => {
    return getItem(key, defaultValue)
  })

  // Synchroniser avec localStorage lors des changements
  useEffect(() => {
    setItem(key, value)
  }, [key, value])

  return [value, setValue]
}
