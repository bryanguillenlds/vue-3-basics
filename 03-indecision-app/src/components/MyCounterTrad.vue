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
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
	props: {
		value: {
			type: Number,
			required: true
		}
	},

	// Have to pass props to the setup function
	setup(props) {
		const count = ref(props.value);
		const squaredCount = computed(() => count.value * count.value);

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
