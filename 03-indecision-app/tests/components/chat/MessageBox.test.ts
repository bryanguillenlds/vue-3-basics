import MessageBox from '@/components/chat/MessageBox.vue';
import { mount } from '@vue/test-utils';

describe('MessageBox', () => {
	const wrapper = mount(MessageBox);

	test('should render the message box component correctly', () => {
		expect(wrapper.html()).toMatchSnapshot();

		// what find does is it finds the first element that matches the selector
		expect(wrapper.find('input[type="text"]').exists()).toBe(true);
		expect(wrapper.find('button').exists()).toBe(true);
	});

	test('should emit message when send button is clicked', async () => {
		const message = 'Hello, world!';

		// Set value allows you to set value to the input
		// Trigger allows you to trigger an event
		await wrapper.find('input[type="text"]').setValue(message);
		await wrapper.find('button').trigger('click');

		// Vue events can emit multiple arguments. We wrap in array because it returns an array of arguments.
		expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);

		// vm Gives you access to vue component instance to access things like state, in this case the message state
		expect((wrapper.vm as any).message).toBe(''); // Expecting the message to be empty after sending
	});

	test('should not emit message when send button is clicked with empty message', async () => {
		const wrapper = mount(MessageBox); //Creating wrapper again because we need to reset the message state

		const input = wrapper.find('input');

		await input.trigger('keyup.enter');
		await wrapper.find('button').trigger('click');

		expect(wrapper.emitted('sendMessage')).toBeUndefined(); // Expecting the message to be undefined after sending // Expecting the message to be empty after sending
	});
});
