import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit, offset }
    });
    return data;
  } catch (error) {
    console.error('Errore nel recupero della lista dei Pokemon:', error);
    throw error;
  }
};

export const getPokemonDetails = async (nameOrId: string | number) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    return data;
  } catch (error) {
    console.error('Errore nel recupero dei dettagli del Pokemon:', error);
    throw error;
  }
};

export const getPokemonSpecies = async (id: string | number) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
    return data;
  } catch (error) {
    console.error('Errore nel recupero dei dettagli della specie:', error);
    throw error;
  }
};

