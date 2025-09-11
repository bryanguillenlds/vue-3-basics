<template>
	<section class="flex flex-col items-center justify-center h-screen">
		<h1 class="text-3xl font-bold">
			Pokemon <small class="text-blue-500">#{{ id }}</small>
		</h1>
		<img
			:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
			alt="Pokemon"
			class="w-[200px] h-[200px] mt-5"
		/>
		<router-link
			:to="{ name: 'pokemon', params: { id: id + 1 } }"
			class="mt-5 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-center"
		>
			Next Pokemon
		</router-link>
	</section>
</template>

<script setup lang="ts">
interface Props {
	id: number;
}

defineProps<Props>();
</script>

<style scoped></style>
