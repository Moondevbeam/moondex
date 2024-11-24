import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Pokemon, PokemonSpecies } from '../types/pokemon'
import { getPokemonList, getPokemonDetails } from '../api/pokeapi.services'

interface PokemonStore {
  searchTerm: string
  showOnlyFavorites: boolean
  favorites: Pokemon[]
  selectedPokemon: Pokemon | null
  pokemonSpecies: PokemonSpecies | null
  isLoading: boolean
  error: string | null
  pokemonList: Pokemon[]
  setSearchTerm: (term: string) => void
  setShowOnlyFavorites: (show: boolean) => void
  addToFavorites: (pokemon: Pokemon) => void
  removeFromFavorites: (pokemonId: number) => void
  isFavorite: (pokemonId: number) => boolean
  setSelectedPokemon: (pokemon: Pokemon | null) => void
  setPokemonSpecies: (species: PokemonSpecies | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchPokemonList: () => Promise<void>
  getFilteredPokemon: () => Pokemon[]
}

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      searchTerm: '',
      showOnlyFavorites: false,
      favorites: [],
      selectedPokemon: null,
      pokemonSpecies: null,
      isLoading: false,
      error: null,
      pokemonList: [],
      setSearchTerm: (term) => set({ searchTerm: term }),
      setShowOnlyFavorites: (show) => set({ showOnlyFavorites: show }),
      addToFavorites: (pokemon) => 
        set((state) => ({ favorites: [...state.favorites, pokemon] })),
      removeFromFavorites: (pokemonId) => 
        set((state) => ({ 
          favorites: state.favorites.filter(p => p.id !== pokemonId) 
        })),
      isFavorite: (pokemonId) => 
        get().favorites.some(pokemon => pokemon.id === pokemonId),
      setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
      setPokemonSpecies: (species) => set({ pokemonSpecies: species }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error: error }),
      fetchPokemonList: async () => {
        const { setIsLoading, setError } = get()
        setIsLoading(true)
        try {
          const data = await getPokemonList(151, 0)
          const pokemonList = await Promise.all(
            data.results.map((pokemon: { name: string }) =>
              getPokemonDetails(pokemon.name)
            )
          )
          set({ pokemonList })
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Errore nel caricamento dei Pokemon')
        } finally {
          setIsLoading(false)
        }
      },
      getFilteredPokemon: () => {
        const { pokemonList, searchTerm, showOnlyFavorites, favorites } = get()
        return pokemonList.filter((poke) => {
          const matchesSearch = poke.name.toLowerCase().includes(searchTerm.toLowerCase())
          if (showOnlyFavorites) {
            return matchesSearch && favorites.some(f => f.id === poke.id)
          }
          return matchesSearch
        })
      }
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