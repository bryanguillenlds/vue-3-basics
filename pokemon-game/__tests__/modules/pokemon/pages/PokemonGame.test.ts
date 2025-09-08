import { mount } from '@vue/test-utils';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { type Mock, vi } from 'vitest';
import { GameStatus } from '@/modules/pokemon/interfaces';

const pokemonOptions = [
  { name: 'pikachu', id: 1 },
  { name: 'bulbasaur', id: 2 },
  { name: 'charmander', id: 3 },
  { name: 'squirtle', id: 4 }
];

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn()
}));

describe('PokemonGame', () => {
  test('should initialize component with default values', () => {
    //wrapped in parentheses to tell typescript that usePokemonGame is a mock and then be able to use the mockReturnValue method
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: true,
      randomChosenPokemon: null,
      gameStatus: GameStatus.playing,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      playAgain: vi.fn()
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Please Wait');
    expect(wrapper.get('h2').text()).toBe('Loading Pokemons...');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);
    expect(wrapper.get('h2').classes()).toEqual(['animate-pulse']);
  });

  test('should render pokemon picture and pokemon options components', () => {
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      randomChosenPokemon: pokemonOptions[0],
      gameStatus: GameStatus.playing,
      pokemonOptions,
      checkAnswer: vi.fn(),
      playAgain: vi.fn()
    });

    const wrapper = mount(PokemonGame);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonOptions[0].id}.svg`;
    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');

    expect(wrapper.get('h1').text()).toBe('Who is this Pokemon?');
    expect(wrapper.find('img').attributes('src')).toContain(imageUrl);
    expect(buttons.length).toBe(pokemonOptions.length);
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(pokemonOptions[index].name);
    });
  });

  test('should render button for play again when gameStatus is won', () => {
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      randomChosenPokemon: pokemonOptions[0],
      gameStatus: GameStatus.won,
      pokemonOptions,
      getPokemonOptions: vi.fn(),
      checkAnswer: vi.fn(),
      playAgain: vi.fn()
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('button[data-testid="play-again-button"]');
    expect(button.text()).toBe('Play Again');
  });

  test('should render button for try again when gameStatus is lost', () => {
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      randomChosenPokemon: pokemonOptions[0],
      gameStatus: GameStatus.lost,
      pokemonOptions,
      getPokemonOptions: vi.fn(),
      checkAnswer: vi.fn(),
      playAgain: vi.fn()
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('button[data-testid="play-again-button"]');
    expect(button.text()).toBe('Try Again');
  });

  test('should call playAgain when play again button is clicked', async () => {
    const playAgainSpy = vi.fn();

    (usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      randomChosenPokemon: pokemonOptions[0],
      gameStatus: GameStatus.won,
      pokemonOptions,
      getPokemonOptions: vi.fn(),
      checkAnswer: vi.fn(),
      playAgain: playAgainSpy
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('button[data-testid="play-again-button"]');
    await button.trigger('click');

    expect(playAgainSpy).toHaveBeenCalled();
  });
});
