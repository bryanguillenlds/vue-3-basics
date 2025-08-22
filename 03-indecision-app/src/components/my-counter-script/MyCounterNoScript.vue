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

<script lang="ts" src="./MyCounterScript"></script>

<style scoped>
h1 {
	color: red;
}
</style>
