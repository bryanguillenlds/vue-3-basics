/* A composable is a function that can be used to share logic between components */

import { computed, ref } from 'vue';

export const useCounter = (initialValue: number = 5) => {
	const count = ref(initialValue);

	const squaredCount = computed(() => {
		return count.value * count.value;
	});

	return {
		count,
		squaredCount
	};
};
