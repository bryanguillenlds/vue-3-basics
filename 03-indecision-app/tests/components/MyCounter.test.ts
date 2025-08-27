import { mount } from '@vue/test-utils';
import MyCounter from '@/components/MyCounter.vue';

// Testing snapshots are necessary when you want to compare
// the output of the component with a previous output in case something in the HTML changes
describe('MyCounter', () => {
	test('should match snapshot', () => {
		// Mount is used to simulate the component in the DOM
		const wrapper = mount(MyCounter, {
			props: {
				value: 5
			}
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('renders the counter value correctly', () => {
		const wrapper = mount(MyCounter, {
			props: {
				value: 5
			}
		});

		const [count, squaredCount] = wrapper.findAll('h3');

		expect(count.text()).toBe('5');
		expect(squaredCount.text()).toBe('25'); // 5 * 5 = 25
	});

	test('should increment the counter when the increment button is clicked', async () => {
		const wrapper = mount(MyCounter, {
			props: {
				value: 5
			}
		});

		const [count, squaredCount] = wrapper.findAll('h3');

		const btnIncrement = wrapper.find('button');

		await btnIncrement.trigger('click');
		expect(count.text()).toBe('6');
		expect(squaredCount.text()).toBe('36'); // 6 * 6 = 36
	});

	test('should decrement the counter when the decrement button is clicked', async () => {
		const wrapper = mount(MyCounter, {
			props: {
				value: 5
			}
		});

		const [count, squaredCount] = wrapper.findAll('h3');

		const btnDecrement = wrapper.find('button:last-child');

		await btnDecrement.trigger('click');
		expect(count.text()).toBe('4');
		expect(squaredCount.text()).toBe('16'); // 4 * 4 = 16
	});
});
