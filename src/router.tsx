import { Router, createRoute, RootRoute } from '@tanstack/react-router';
import App from './App';
import { PokemonDetail } from './components/PokemonDetail';
import { PokemonList } from './components/PokemonList';

const rootRoute = new RootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PokemonList,
});

const pokemonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pokemon/$pokemonName',
  component: PokemonDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, pokemonRoute]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
} 