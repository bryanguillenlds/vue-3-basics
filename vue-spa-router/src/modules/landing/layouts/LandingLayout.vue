<template>
	<div class="flex flex-col h-screen">
		<!-- Header -->
		<header
			class="flex items-center h-14 px-4 py-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8"
		>
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
					<RouterLink to="/pokemon/1"> Pokemon </RouterLink>
					<RouterLink to="/auth/login"> Login </RouterLink>
				</div>
			</nav>
		</header>
		<!-- End Header -->

		<!-- Main -->
		<main class="flex-1 flex items-center justify-center">
			<!-- We use keep-alive to keep the component alive when the user navigates between routes
			 So we don't lose the state of the component without the need for state management -->
			<!-- RouterView uses a scoped slot to intercept the component that Vue Router wants to render
     Vue Router determines which component to display based on the current route
     The v-slot="{ Component }" gives us access to that component before RouterView renders it
     This allows us to wrap the routed component with additional functionality like keep-alive -->
			<RouterView v-slot="{ Component }">
				<!-- keep-alive prevents the component from being destroyed when navigating away
       This preserves component state (form data, scroll position, etc.) without needing Vuex/Pinia
       When you navigate back to the route, the component is restored exactly as you left it -->
				<keep-alive>
					<!-- component :is="Component" dynamically renders whatever component RouterView provides
         Component comes from Vue Router's route matching, not from a child component
         This is the actual routed component (like HomeView, AboutView, etc.) -->
					<component :is="Component" />
				</keep-alive>
			</RouterView>
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
