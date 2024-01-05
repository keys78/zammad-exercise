export interface ShowExercises {
  second: boolean
  third: boolean
}

// Loading Store
export interface LoadingState {
  loading: boolean
}

// Pokemon Store
export interface Pokemon {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export interface PokemonState {
  counts: number
  next: string | null
  previous: string | null
  results: Pokemon[]
  singlePokemon: any
  offset: number
}

// Notification Store
export type NotificationType = 'success' | 'error' | 'info'

export interface Notification {
  id: number
  type: NotificationType
  message: string
}

export interface NotificationState {
  notifications: Notification[]
}
