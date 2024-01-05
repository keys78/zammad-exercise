import { defineStore } from 'pinia'
import { LoadingState } from '../types/exercise'

const useLoadingStore = defineStore('loading', {
  state: (): LoadingState => ({
    loading: false,
  }),

  getters: {
    loadingState: (state): boolean => state.loading,
  },

  actions: {
    startRequest(this: any): () => void {
      this.loading = true
      return () => {
        this.loading = false
      }
    },
  },
})

export default useLoadingStore
