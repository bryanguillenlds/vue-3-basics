import ChatBubble from '@/components/chat/chatBubble.vue';
import { mount } from '@vue/test-utils';

describe('ChatBubble', () => {
	test('should render the chat bubble component correctly', () => {
		const wrapper = mount(ChatBubble, {
			props: {
				message: 'Hello, world!',
				sentByMe: true,
				image: null
			}
		});

		expect(wrapper.find('.bg-blue-200').exists()).toBe(true);
		expect(wrapper.find('.bg-blue-200').text()).toContain(wrapper.props().message);

		expect(wrapper.find('.bg-gray-300').exists()).toBe(false);
	});

	test('should render received message correctly with image', () => {
		const wrapper = mount(ChatBubble, {
			props: {
				message: 'Hello, world!',
				sentByMe: false,
				image: 'https://via.placeholder.com/150'
			}
		});

		expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
		expect(wrapper.find('.bg-gray-300').text()).toContain(wrapper.props().message);

		expect(wrapper.find('img').exists()).toBe(true);
		expect(wrapper.find('img').attributes('src')).toBe(wrapper.props().image);

		expect(wrapper.find('.bg-blue-200').exists()).toBe(false);
	});
});
