<template>
	<div class="flex flex-col h-screen">
		<!-- Header -->
		<header class="flex items-center h-14 px-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8">
			<!-- <div>
				<a class="flex items-center gap-2 font-semibold" href="#">
					<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
				</a>
			</div> -->
			<nav class="ml-auto space-x-4 flex flex-col items-end h-10 sm:space-x-6">
				<div class="space-x-4">
					<RouterLink to="/"> Home </RouterLink>
					<RouterLink to="/features"> Features </RouterLink>
					<RouterLink to="/pricing"> Pricing </RouterLink>
					<RouterLink to="/contact"> Contact </RouterLink>
				</div>
				<div class="space-x-4">
					<RouterLink to="/auth/login"> Login </RouterLink>
				</div>
			</nav>
		</header>
		<!-- End Header -->

		<!-- Main -->
		<main class="flex-1 flex items-center justify-center">
			<RouterView />
		</main>
		<!-- End Main -->

		<!-- Footer -->
		<footer class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8">
			<p class="flex-1 text-sm text-gray-500 text-center">
				© {{ new Date().getFullYear() }} Bryan Guillen. All rights reserved.
			</p>
		</footer>
		<!-- End Footer -->
	</div>
</template>

<script setup lang="ts"></script>
