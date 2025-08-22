<template>
	<h1>Parent Component</h1>
	<hr />

	<MyCounter :value="5" />
	<MyCounterTrad :value="5" />
</template>

<script setup lang="ts">
//setup keyword is so that you don't have to use setup in the script tag
//this already tells it what to do

import MyCounter from './components/MyCounter.vue';
import MyCounterTrad from './components/MyCounterTrad.vue';
</script>

<style scoped>
h1 {
	color: red;
}
</style>
