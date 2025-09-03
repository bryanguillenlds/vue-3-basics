<template>
  <section class="mt-5 flex flex-col gap-2">
    <button
      v-for="pokemon in pokemonOptions"
      :key="pokemon.id"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: pokemon.id === correctAnswer && blockedSelection,
          incorrect: pokemon.id !== correctAnswer && blockedSelection
        }
      ]"
      :disabled="blockedSelection"
      @click="$emit('selectedOption', pokemon.id)"
    >
      {{ pokemon.name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '@/modules/pokemon/interfaces/pokemon.interface';

interface Props {
  pokemonOptions: Pokemon[];
  blockedSelection: boolean;
  correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
@import 'tailwindcss';

button {
  @apply bg-white shadow-md rounded-md p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-green-500;
}

.incorrect {
  @apply bg-red-500;
}
</style>
