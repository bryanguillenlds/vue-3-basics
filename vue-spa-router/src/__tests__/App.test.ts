import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';

describe('App', () => {
	test('should be rendered correctly with router view', () => {
		// shallowMount vs mount:
		// - shallowMount: renders only this component, stubs child components (unit testing)
		// - mount: renders component + all children fully (integration testing)
		// Using shallowMount here because we only need to test App's structure, not child pages
		const wrapper = shallowMount(App, {
			global: {
				// Router plugin is necessary because App.vue likely uses <router-view>
				// or other router functionality that requires router context
				plugins: [router]
			}
		});

		const routerView = wrapper.findComponent({ name: 'RouterView' });

		expect(routerView.exists()).toBe(true);
	});
});
