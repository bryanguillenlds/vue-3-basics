import { onMounted, ref, computed } from 'vue';
import { GameStatus, type PokemonListResponse, type Pokemon } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const randomChosenPokemon = computed(() => {
    //grab a pokemon from pokemon options array
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonArray = response.data.results.map((pokemon) => {
      // Grab the id from the url, example: https://pokeapi.co/api/v2/pokemon/101/
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? '0';

      return {
        name: pokemon.name,
        id: Number(id)
      };
    });

    // Shuffle the array by passing a function that returns a random number between 0 and 1 and subtracts 0.5 so we have both
    // positive and negative values
    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getPokemonOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.playing; //set the game status to playing
    pokemonOptions.value = pokemons.value.slice(0, howMany); //get the guessing options
    pokemons.value = pokemons.value.slice(howMany); //remove the guessing options from the original array
  };

  onMounted(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); //simulate a delay to show the loading screen

    pokemons.value = await getPokemons(); //populate the pokemons array with the pokemons from request result);
    getPokemonOptions(); //get the guessing options
    console.log(pokemonOptions.value);
  });

  return {
    gameStatus,
    isLoading,
    pokemons,
    pokemonOptions,
    randomChosenPokemon,

    getPokemons,
    getPokemonOptions
  };
};
