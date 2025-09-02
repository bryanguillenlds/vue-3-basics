<template>
  <section class="mt-5">
    <ul>
      <li
        v-for="pokemon in pokemonOptions"
        :key="pokemon.id"
        class="capitalize"
        @click="$emit('selectedOption', pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '@/modules/pokemon/interfaces/pokemon.interface';

interface Props {
  pokemonOptions: Pokemon[];
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
@reference '@/assets/styles.css';
li {
  @apply bg-white shadow-md rounded-md p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}
</style>
