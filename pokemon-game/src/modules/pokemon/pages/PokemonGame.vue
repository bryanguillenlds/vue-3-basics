<template>
  <section
    v-if="isLoading || !randomChosenPokemon"
    class="flex flex-col items-center justify-center w-screen h-screen"
  >
    <h1 class="text-3xl">Please Wait</h1>
    <h2 class="animate-pulse">Loading Pokemons...</h2>
  </section>

  <section v-else class="flex flex-col items-center justify-center w-screen h-screen">
    <h1 class="m-5 text-3xl">Who is this Pokemon?</h1>
    <button
      v-if="gameStatus === GameStatus.won || gameStatus === GameStatus.lost"
      class="mb-5 text-2xl capitalize text-gray-500"
      @click="playAgain"
      data-testid="play-again-button"
    >
      {{ gameStatus === GameStatus.won ? 'Play Again' : 'Try Again' }}
    </button>
    <!-- Pokemon Image -->
    <PokemonPicture
      :pokemon-id="randomChosenPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.playing"
    />
    <h3 v-if="gameStatus === GameStatus.won" class="mt-5 text-2xl">You won!</h3>
    <h3 v-if="gameStatus === GameStatus.lost" class="mt-5 text-2xl text-warning">
      You lost, try again!
    </h3>

    <!-- Pokemon Options -->
    <PokemonOptions
      :blocked-selection="gameStatus !== GameStatus.playing"
      :pokemon-options="pokemonOptions"
      :correct-answer="randomChosenPokemon.id"
      @selected-option="handleSelectedOption"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { isLoading, pokemonOptions, randomChosenPokemon, gameStatus, checkAnswer, playAgain } =
  usePokemonGame();

const handleSelectedOption = (id: number) => {
  checkAnswer(id);
};
</script>

<style scoped>
@import 'tailwindcss';

button {
  @apply bg-blue-200 rounded-md p-2 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-200;
}
</style>
