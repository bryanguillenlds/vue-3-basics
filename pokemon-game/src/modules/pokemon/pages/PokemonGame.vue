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
    <h3 class="text-2xl">
      {{ randomChosenPokemon.name }}
    </h3>
    <!-- Pokemon Image -->
    <PokemonPicture
      :pokemon-id="randomChosenPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.playing"
    />
    <h3 v-if="gameStatus === GameStatus.won" class="text-2xl">You won!</h3>

    <!-- Pokemon Options -->
    <PokemonOptions :pokemon-options="pokemonOptions" @selected-option="handleSelectedOption" />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { isLoading, pokemonOptions, randomChosenPokemon, gameStatus } = usePokemonGame();

const handleSelectedOption = (id: number) => {
  console.log(id);
};
</script>
