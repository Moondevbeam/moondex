export class PokemonError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PokemonError'
  }
} 