// Durées par défaut en minutes
export const DEFAULT_DURATIONS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionsUntilLongBreak: 4,
}

// Volume par défaut (entre 0 et 1)
export const DEFAULT_VOLUME = 0.5

// Clés localStorage
export const STORAGE_KEYS = {
  settings: 'pomodoro_settings',
  currentTask: 'pomodoro_current_task',
  sessions: 'pomodoro_sessions',
  appState: 'pomodoro_app_state',
}

// Types de sessions
export const SESSION_TYPES = {
  WORK: 'work',
  SHORT_BREAK: 'short-break',
  LONG_BREAK: 'long-break',
}

// États du timer
export const TIMER_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
}

// Limites
export const LIMITS = {
  minDuration: 1,
  maxDuration: 60,
  maxSessionsHistory: 1000,
}

// Labels d'affichage
export const SESSION_LABELS = {
  [SESSION_TYPES.WORK]: 'Travail',
  [SESSION_TYPES.SHORT_BREAK]: 'Pause courte',
  [SESSION_TYPES.LONG_BREAK]: 'Pause longue',
}
