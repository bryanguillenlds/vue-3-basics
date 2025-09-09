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
				}
			]
		},
		{
			path: '/auth',
			name: 'auth',
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
		}
	]
});

export default router;
