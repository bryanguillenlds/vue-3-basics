<template>
	<section>
		<h3>{{ count }}</h3>
		<h3>{{ squaredCount }}</h3>

		<div>
			<button @click="count++">+1</button>
			<button @click="count--">-1</button>
		</div>
	</section>
</template>

<script setup lang="ts">
//setup keyword is so that you don't have to use setup in the script tag
//this already tells it what to do

import { ref, computed, defineProps } from 'vue';

/* Option 1: Runtime Props (JavaScript-style with TypeScript)
// PROS:
// - Runtime validation: Vue checks prop types at runtime and throws clear errors
// - Better debugging: You get helpful error messages if wrong props are passed
// - Works without TypeScript: Can be used in regular JavaScript files
// - Built-in validation: Vue handles type checking automatically
// - Clear error messages: "Invalid prop: type check failed for prop 'value'"
//
// CONS:
// - Less type safety: TypeScript can't infer exact types as well
// - Runtime overhead: Slight performance cost due to validation
// - Verbose syntax: More code to write for complex prop definitions
// - Limited TypeScript features: Can't use advanced types like unions easily */
// const props = defineProps({
// 	value: {
// 		type: Number,
// 		required: true
// 	}
// });

/* Option 2: Type-Only Props (Pure TypeScript Generic)
// PROS:
// - Full TypeScript support: Complete type safety and IntelliSense
// - Better performance: No runtime validation overhead
// - Cleaner syntax: Less verbose, more readable
// - Advanced types: Can use unions, generics, complex interfaces
// - Compile-time checking: Catches errors before runtime
// - Better refactoring: TypeScript can track prop usage across files
//
// CONS:
// - No runtime validation: Props aren't checked at runtime
// - TypeScript required: Won't work in JavaScript files
// - Silent failures: Wrong prop types might not cause obvious errors
// - Learning curve: Requires understanding TypeScript generics */
interface Props {
	value: number;
}

const props = defineProps<Props>();

const count = ref(props.value);

const squaredCount = computed(() => {
	return count.value * count.value;
});
</script>

<style scoped>
h1 {
	color: red;
}
</style>
