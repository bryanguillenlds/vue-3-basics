import MockAdapter from 'axios-mock-adapter';
import { flushPromises } from '@vue/test-utils';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { withSetup } from '../../../utils/with-setup';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { vi } from 'vitest';
import confetti from 'canvas-confetti';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'spearow', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'ekans', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
    { name: 'sandshrew', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
    { name: 'nidoran-f', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
    { name: 'nidoran-m', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
    { name: 'nidorina', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
    { name: 'nidoqueen', url: 'https://pokeapi.co/api/v2/pokemon/15/' }
  ]
});

// Vitest intercepts the import and now confetti becomes this mock function, not the real confetti function
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

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

  test('should set the correct values when getPokemonOptions is called', async () => {
    const [composable] = withSetup(usePokemonGame);

    await new Promise((resolve) => setTimeout(resolve, 1100));
    await flushPromises();

    composable.getPokemonOptions(4);

    expect(composable.gameStatus.value).toBe(GameStatus.playing);
    expect(composable.pokemonOptions.value).toHaveLength(4);
  });

  test('should correctly handle getPokemonOptions and return different pokemon options', async () => {
    const [composable] = withSetup(usePokemonGame);

    await new Promise((resolve) => setTimeout(resolve, 1100));
    await flushPromises();

    const previousPokemonOptions = composable.pokemonOptions.value;

    composable.getPokemonOptions();

    expect(composable.pokemonOptions.value).toHaveLength(4);
    expect(composable.pokemonOptions.value).not.toEqual(previousPokemonOptions);
  });

  test('should correctly handle checkAnswer with incorrect answer', async () => {
    const [composable] = withSetup(usePokemonGame);

    await new Promise((resolve) => setTimeout(resolve, 1100));
    await flushPromises();

    composable.checkAnswer(152); //152 is not a valid pokemon id

    expect(composable.gameStatus.value).toBe(GameStatus.lost);
  });

  test('should correctly handle checkAnswer with correct answer', async () => {
    const [composable] = withSetup(usePokemonGame);

    await new Promise((resolve) => setTimeout(resolve, 1100));
    await flushPromises();

    composable.checkAnswer(composable.randomChosenPokemon.value.id);

    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 200,
      origin: { y: 0.6 }
    });
    expect(composable.gameStatus.value).toBe(GameStatus.won);
  });
});
