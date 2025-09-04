import MockAdapter from 'axios-mock-adapter';
import { flushPromises } from '@vue/test-utils';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { withSetup } from '../../../utils/with-setup';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/5/' }
  ]
});

describe('usePokemonGame', () => {
  test('should return the correct initial values', async () => {
    const [composable] = withSetup(usePokemonGame);

    expect(composable.gameStatus.value).toBe(GameStatus.playing);
    expect(composable.isLoading.value).toBe(true);
    expect(composable.pokemons.value).toEqual([]);
    expect(composable.pokemonOptions.value).toEqual([]);
    expect(composable.randomChosenPokemon.value).toEqual(undefined);

    await new Promise((resolve) => setTimeout(resolve, 1100)); // Wait for the 1-second delay
    await flushPromises(); //need to wait for the composable to be mounted

    // Debug: Check what actually happened
    console.log('pokemons.value:', composable.pokemons.value);
    console.log('pokemons.value.length:', composable.pokemons.value.length);
    console.log('isLoading.value:', composable.isLoading.value);

    expect(composable.isLoading.value).toBe(false);
    expect(composable.pokemons.value).toEqual(expect.any(Array));
    expect(composable.pokemonOptions.value).toHaveLength(4);
    expect(composable.randomChosenPokemon.value).toEqual(expect.any(Object));
  });
});
