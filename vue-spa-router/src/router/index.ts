import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'landing',
			component: () => import('@/modules/landing/layouts/LandingLayout.vue'),
			children: [
				{
					path: '',
					name: 'home',
					component: () => import('@/modules/landing/pages/HomePage.vue')
				},
				{
					path: 'pricing',
					name: 'pricing',
					component: () => import('@/modules/landing/pages/PricingPage.vue')
				},
				{
					path: 'features',
					name: 'features',
					component: () => import('@/modules/landing/pages/FeaturesPage.vue')
				},
				{
					path: 'contact',
					name: 'contact',
					component: () => import('@/modules/landing/pages/ContactPage.vue')
				},
				{
					path: 'pokemon/:id',
					name: 'pokemon',
					props: (route) => {
						const id = Number(route.params.id);

						if (isNaN(id)) {
							return { id: 1 };
						}

						return { id };
					},
					beforeEnter: [isAuthenticatedGuard],
					component: () => import('@/modules/pokemons/pages/PokemonPage.vue')
				}
			]
		},
		{
			path: '/auth',
			name: 'auth',
			redirect: { name: 'login' },
			component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
			children: [
				{
					path: 'register',
					name: 'register',
					component: () => import('@/modules/auth/pages/RegisterPage.vue')
				},
				{
					path: 'login',
					name: 'login',
					component: () => import('@/modules/auth/pages/LoginPage.vue')
				}
			]
		},
		{
			path: '/:catchAll(.*)*',
			name: 'not-found',
			component: () => import('@/modules/not-found/pages/NotFoundPage.vue')
		}
	]
});

export default router;
