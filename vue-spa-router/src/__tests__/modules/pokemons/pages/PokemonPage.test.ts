import { mount } from '@vue/test-utils';
import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('PokemonPage', () => {
	// Using mount instead of shallowMount because:
	// 1. Testing component behavior: We need to test RouterLink's props and navigation logic
	// 2. Simple component structure: Only basic HTML elements and one RouterLink, no complex children
	// 3. Integration testing: Testing how props affect the rendered output and component behavior
	// 4. RouterLink testing: Need to access RouterLink component's props (to prop with id + 1 logic)
	// shallowMount would stub RouterLink and prevent testing its actual behavior
	const wrapper = mount(PokemonPage, {
		props: {
			id: 1
		},
		global: {
			stubs: {
				RouterLink: RouterLinkStub
			}
		}
	});

	it('should be rendered correctly', () => {
		expect(wrapper.find('h1').exists()).toBe(true);
		expect(wrapper.find('img').attributes('src')).toBe(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
		);
	});

	test('should navigate to the next pokemon', () => {
		const link = wrapper.findComponent({ name: 'RouterLinkStub' });

		expect(link.exists()).toBe(true);
		expect(link.props().to).toEqual({ name: 'pokemon', params: { id: 2 } });
	});
});
