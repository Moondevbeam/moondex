import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Pokemon } from '../types/pokemon'

interface PokemonStore {
  searchTerm: string
  showOnlyFavorites: boolean
  favorites: Pokemon[]
  setSearchTerm: (term: string) => void
  setShowOnlyFavorites: (show: boolean) => void
  addToFavorites: (pokemon: Pokemon) => void
  removeFromFavorites: (pokemonId: number) => void
  isFavorite: (pokemonId: number) => boolean
}

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      searchTerm: '',
      showOnlyFavorites: false,
      favorites: [],
      setSearchTerm: (term) => set({ searchTerm: term }),
      setShowOnlyFavorites: (show) => set({ showOnlyFavorites: show }),
      addToFavorites: (pokemon) => {
        const state = get()
        if (state.favorites.some(p => p.id === pokemon.id)) return
        set({ favorites: [...state.favorites, pokemon] })
      },
      removeFromFavorites: (pokemonId) => 
        set((state) => ({ 
          favorites: state.favorites.filter(p => p.id !== pokemonId) 
        })),
      isFavorite: (pokemonId) => 
        get().favorites.some(pokemon => pokemon.id === pokemonId),
    }),
    {
      name: 'pokemon-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        searchTerm: state.searchTerm,
        showOnlyFavorites: state.showOnlyFavorites
      })
    }
  )
) 