import { defineStore } from 'pinia'
import useLoadingStore from './loading'
import pokemonAPI from '../api'
import { PokemonState, Pokemon, PokemonListResponse } from '../types/exercise'
import useNotificationStore from './notification'

const usePokemonStore = defineStore({
  id: 'pokemons',
  state: (): PokemonState => ({
    counts: 0,
    next: null,
    previous: null,
    results: [],
    singlePokemon: {},
    offset: 0,
  }),

  getters: {
    allPokemons: (state): Pokemon[] => {
      return state.results
    },
  },

  actions: {
    async fetchPokemons(this: any, offset?: number): Promise<Pokemon[]> {
      const loadingStore = useLoadingStore()
      const stopLoading = loadingStore.startRequest()
      const notificationStore = useNotificationStore()

      try {
        const res = await pokemonAPI.get<PokemonListResponse>(
          `/pokemon?offset=${offset ?? this.offset}&limit=20`,
        )
        this.counts = res.data.count
        this.next = res.data.next
        this.previous = res.data.previous
        this.results = res.data.results
        notificationStore.addNotification(
          'success',
          'Pokemon data fetched successfully',
        )

        return res.data.results
      } catch (error) {
        notificationStore.addNotification(
          'error',
          'Failed to fetch Pokemon data',
        )
        throw error
      } finally {
        stopLoading()
      }
    },
    async fetchNext(): Promise<Pokemon[]> {
      this.offset += 20
      return this.fetchPokemons()
    },

    async fetchPrevious(): Promise<Pokemon[]> {
      this.offset = Math.max(0, this.offset - 20)
      return this.fetchPokemons()
    },

    async fetchSinglePokemon(this: any, url: string): Promise<void> {
      const loadingStore = useLoadingStore()
      const stopLoading = loadingStore.startRequest()
      const notificationStore = useNotificationStore()

      try {
        const id = url.split('/').filter(Boolean).pop()

        if (!id) {
          throw new Error('Invalid URL')
        }

        const res = await pokemonAPI.get<Pokemon>(`/pokemon/${id}/`)

        this.singlePokemon = res.data
        notificationStore.addNotification(
          'success',
          `${res.data?.name} fetch success`,
        )
      } catch (error) {
        notificationStore.addNotification(
          'error',
          'Failed to fetch Pokemon Details',
        )
        throw error
      } finally {
        stopLoading()
      }
    },
  },
})

export default usePokemonStore
