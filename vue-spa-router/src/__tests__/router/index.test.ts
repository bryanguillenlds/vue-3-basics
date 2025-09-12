import router from '@/router';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import type { RouteLocationNormalized } from 'vue-router';

describe('router', () => {
	let wrapper = mount(App, {
		global: {
			plugins: [router]
		}
	});

	beforeEach(async () => {
		wrapper = mount(App, {
			global: {
				plugins: [router]
			}
		});
	});

	test('renders HomePage when navigating to /', async () => {
		/*
      Without await router.isReady(), the test might run before the router has:
      - Determined that /home is the current route
      - Loaded the corresponding component
      - Rendered the "Welcome to our website" content
      This could cause the test to fail with a false negative:
      The content might actually be there, but the router hasn't finished setting it up yet.
    */
		await router.isReady();

		expect(wrapper.html()).toContain('Welcome to our website');
	});

	test('renders FeaturesPage when navigating to /features', async () => {
		await router.replace('/features');
		await router.isReady();

		expect(wrapper.html()).toContain('Features');
	});

	test('renders PricingPage when navigating to /pricing', async () => {
		await router.replace('/pricing');
		await router.isReady();

		expect(wrapper.html()).toContain('Pricing');
	});

	test('renders ContactPage when navigating to /contact', async () => {
		await router.replace('/contact');
		await router.isReady();

		expect(wrapper.html()).toContain('Contact');
	});

	test('renders LoginPage when navigating to /pokemon/:id if the user is NOT authenticated', async () => {
		localStorage.clear(); // clearing to simulate not authenticated user

		await router.replace('/pokemon/123');
		await router.isReady();

		expect(wrapper.html()).toContain('Login');
	});

	test('renders PokemonPage when navigating to /pokemon/:id if the user IS authenticated', async () => {
		vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-123');

		await router.replace('/pokemon/123');
		await router.isReady();

		expect(wrapper.html()).toContain('#123');
		expect(wrapper.html()).toContain('Next Pokemon');
		expect(wrapper.html()).toContain('Pokemon');
		expect(wrapper.html()).toContain(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/123.svg'
		);
	});

	test('should convert the id to a default number if it is not a number', async () => {
		await router.push('/pokemon/abc');
		await router.isReady();

		const testRoute: RouteLocationNormalized = {
			name: 'undefined',
			params: { id: 'abc' },
			fullPath: '/pokemon/abc',
			matched: [],
			query: {},
			hash: '',
			redirectedFrom: undefined,
			meta: {},
			path: '/pokemon/abc'
		};

		const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const props = (pokemonRoute?.props as any).default(testRoute);

		expect(props).toEqual({ id: 1 });
		expect(wrapper.html()).toContain('#1');
	});
});
