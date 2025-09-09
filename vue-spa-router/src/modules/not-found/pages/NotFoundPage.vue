<template>
	<div class="flex flex-col items-center justify-center h-screen text-center">
		<h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
		<h2 class="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
		<p class="text-gray-500 mb-8 max-w-md mx-auto">
			Sorry, the page you're looking for doesn't exist or has been moved.
		</p>
		<div class="space-x-4">
			<router-link
				replace
				to="/"
				class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
			>
				Go Home
			</router-link>
			<router-link
				replace
				:to="previousRoute as string"
				class="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
			>
				Go Back
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const previousRoute = computed(() => {
	return router.options.history.state.back || '/';
});
</script>

<style scoped></style>
