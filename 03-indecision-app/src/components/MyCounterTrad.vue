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

<script lang="ts">
import { defineComponent } from 'vue';
import { useCounter } from '../composables/useCounter';

export default defineComponent({
	props: {
		value: {
			type: Number,
			required: true
		}
	},

	// Have to pass props to the setup function
	setup(props) {
		const { count, squaredCount } = useCounter(props.value);

		return {
			count,
			squaredCount
		};
	}
});
</script>

<style scoped>
h1 {
	color: red;
}
</style>
