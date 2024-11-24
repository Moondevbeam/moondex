import { useCallback, useMemo } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Pokemon } from '../types/pokemon';
import { usePokemonStore } from '../store/pokemonStore';
import { TYPE_COLORS } from '../constants/pokemonTypes';

interface PokemonTableProps {
  pokemon: Pokemon[];
  onPokemonClick: (name: string) => void;
}

interface PokemonRow {
  id: number;
  name: string;
  sprite: string;
  types: Pokemon['types'];
}

const INITIAL_STATE = {
  pagination: {
    paginationModel: { page: 0, pageSize: 10 },
  },
  sorting: {
    sortModel: [{ field: 'id', sort: 'asc' as const }],
  }
};

export function PokemonTable({ pokemon, onPokemonClick }: PokemonTableProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = usePokemonStore();

  const toggleFavorite = useCallback((pokemonId: number) => {
    const pokemonToToggle = pokemon.find(p => p.id === pokemonId);
    if (!pokemonToToggle) return;

    if (isFavorite(pokemonId)) {
      removeFromFavorites(pokemonId);
    } else {
      addToFavorites(pokemonToToggle);
    }
  }, [pokemon, isFavorite, removeFromFavorites, addToFavorites]);

  const rows = useMemo(() => pokemon.map((poke) => ({
    id: poke.id,
    name: poke.name,
    sprite: poke.sprites.other['official-artwork'].front_default,
    types: poke.types,
  })), [pokemon]);

  const renderPokemonImage = useCallback((params: GridRenderCellParams<PokemonRow>) => {
    const type = params.row.types[0].type.name;
    const backgroundColor = TYPE_COLORS[type as keyof typeof TYPE_COLORS] || '#A8A878';
    
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div 
          className="flex items-center justify-center w-32 h-32 rounded-full p-2"
          style={{ 
            backgroundColor,
          }}
        >
          <img 
            src={params.row.sprite} 
            alt={params.row.name}
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
    );
  }, []);

  const renderActions = useCallback((params: GridRenderCellParams<PokemonRow>) => (
    <div className="flex w-full h-full items-center justify-end gap-4 pr-8">
      <button
        onClick={() => onPokemonClick(params.row.name)}
        className="text-purple-600 hover:text-purple-800 text-lg"
      >
        Go to details
      </button>
      <button
        onClick={() => toggleFavorite(params.row.id)}
        className="text-2xl"
      >
        {isFavorite(params.row.id) ? '❤️' : '🤍'}
      </button>
    </div>
  ), [onPokemonClick, toggleFavorite, isFavorite]);

  const columns: GridColDef<PokemonRow>[] = useMemo(() => [
    {
      field: 'image',
      headerName: '',
      width: 150,
      renderCell: renderPokemonImage,
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div className="flex w-full h-full items-center">
          <span className="capitalize">{params.value}</span>
        </div>
      ),
    },
    {
      field: 'id',
      headerName: 'Id',
      width: 100,
      renderCell: (params) => (
        <div className="flex w-full h-full items-center">
          <span className="font-bold">#{params.value.toString().padStart(3, '0')}</span>
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Options',
      width: 300,
      align: 'right',
      headerAlign: 'right',
      renderCell: renderActions,
    },
  ], [renderPokemonImage, renderActions]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={INITIAL_STATE}
      pageSizeOptions={[10, 20, 50]}
      disableRowSelectionOnClick
      className="border-none"
      rowHeight={150}
      getRowClassName={() => 'text-lg'}
    />
  );
} 