import { mount } from '@vue/test-utils';
import IndecisionView from '@/views/IndecisionView.vue';

const mockChatMessages = {
	template: '<div>Mock Chat Messages</div>'
};

describe('IndecisionView', () => {
	test('should render the component correctly', () => {
		const wrapper = mount(IndecisionView);

		expect(wrapper.html()).toMatchSnapshot();

		expect(wrapper.findComponent({ name: 'ChatMessages' }).exists()).toBe(true);
		expect(wrapper.findComponent({ name: 'MessageBox' }).exists()).toBe(true);
	});

	test('should call onMessageSent when message is emmitted', async () => {
		// A stub is a way to replace a component with a mock component
		// In this case, we are replacing the ChatMessages component with a mock component
		// This is so we can test the onMessageSent function without having to test the chatMessages component
		const wrapper = mount(IndecisionView, {
			global: {
				stubs: {
					ChatMessages: mockChatMessages
				}
			}
		});

		const messageBoxComponent = wrapper.findComponent({ name: 'MessageBox' });

		messageBoxComponent.vm.$emit('sendMessage', 'Hello, world!');

		await new Promise((resolve) => setTimeout(resolve, 150)); // Wait for the message to be processed from chatMessages component

		// Test that the event was actually emitted
		expect(messageBoxComponent.emitted('sendMessage')).toBeTruthy();
		expect(messageBoxComponent.emitted('sendMessage')).toHaveLength(1);
		expect(messageBoxComponent.emitted('sendMessage')?.[0]).toEqual(['Hello, world!']);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
