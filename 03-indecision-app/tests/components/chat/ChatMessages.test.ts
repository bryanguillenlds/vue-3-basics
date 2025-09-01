import { mount } from '@vue/test-utils';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import { vi } from 'vitest';
import { nextTick } from 'vue';

const messages = [
	{
		id: 1,
		message: 'Hello, world!',
		sentByMe: true,
		image: null
	},
	{
		id: 2,
		message: 'Hello, world!',
		sentByMe: false,
		image: 'https://via.placeholder.com/150'
	}
];

describe('ChatMessages', () => {
	const wrapper = mount(ChatMessages, {
		props: {
			messages
		}
	});

	test('should render the chat messages component correctly', () => {
		const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });

		expect(wrapper.html()).toMatchSnapshot();

		expect(chatBubbles.length).toBe(messages.length);
	});

	test('should scroll to the bottom when a new message is added', async () => {
		const scrollToMock = vi.fn();

		// Get the chat container reference from the component
		// This is the div that will be scrolled
		const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;

		// Replace the real scrollTo method with our mock function
		// This allows us to verify that scrollTo was called without actually scrolling
		chatRef.scrollTo = scrollToMock;

		// Simulate adding a new message by changing the props
		// IMPORTANT: This creates a NEW array at a different memory location
		// That's why we need the getter function in the watch() - direct watching would miss this change (this is in the component)
		wrapper.setProps({
			messages: [
				...messages,
				{
					id: 3,
					message: 'Hey there',
					sentByMe: true,
					image: null
				}
			]
		});

		// Wait for the setTimeout in the component to complete
		// The component uses a 100ms delay to ensure DOM is fully updated before scrolling
		await new Promise((resolve) => setTimeout(resolve, 150));

		//Expect the scroll top to be the same as the scroll height
		expect(chatRef.scrollTop).toBe(chatRef.scrollHeight);
		// Verify that scrollTo was called exactly once
		expect(scrollToMock).toHaveBeenCalledTimes(1);

		// Verify that scrollTo was called with the correct parameters
		// The component should scroll to the bottom (scrollHeight) with smooth behavior
		expect(scrollToMock).toHaveBeenCalledWith({
			top: expect.any(Number),
			behavior: 'smooth'
		});

		//Expect the scroll top to be the same as the scroll height
		expect(chatRef.scrollTop).toBe(chatRef.scrollHeight);
	});
});
