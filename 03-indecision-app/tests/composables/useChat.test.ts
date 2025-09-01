import { useChat } from '@/composables/useChat';
import { vi } from 'vitest';

describe('useChat composable', () => {
	test('should initialize messages with empty array', () => {
		const { messages } = useChat();

		expect(messages.value).toEqual([]);
	});

	test('should add a message when onSendMessage is called', async () => {
		const { messages, onSendMessage } = useChat();

		await onSendMessage('Hello, world!');

		expect(messages.value).toHaveLength(1);

		expect(messages.value).toEqual([
			{
				id: expect.any(Number),
				message: 'Hello, world!',
				sentByMe: true,
				image: null
			}
		]);
	});

	test('should not add a message when onSendMessage is called with an empty string', async () => {
		const { messages, onSendMessage } = useChat();

		await onSendMessage('');

		expect(messages.value).toHaveLength(0);
	});

	test('should get ChatGIF response when onSendMessage is called with a question mark', async () => {
		const { messages, onSendMessage } = useChat();

		await onSendMessage('Should I buy a new laptop?');

		await new Promise((resolve) => setTimeout(resolve, 2000));

		const [myMessage, responseMessage] = messages.value;

		expect(messages.value).toHaveLength(2);
		expect(responseMessage).toEqual({
			id: expect.any(Number),
			message: expect.any(String),
			sentByMe: false,
			image: expect.any(String)
		});
	});

	test('should mock the fetch API request', async () => {
		const mockResponse = { answer: 'Yes', image: 'https://via.placeholder.com/150.gif' };

		//TypeScript doesn't know that fetch exists on window. "As any" bypasses TypeScript's type checking
		(window as any).fetch = vi.fn(async () => {
			return {
				json: async () => {
					return mockResponse;
				}
			};
		});

		const { messages, onSendMessage } = useChat();

		await onSendMessage('Should I buy a new laptop?');

		await new Promise((resolve) => setTimeout(resolve, 1600));

		const [, responseMessage] = messages.value;

		expect(responseMessage).toEqual({
			id: expect.any(Number),
			message: mockResponse.answer,
			sentByMe: false,
			image: mockResponse.image
		});
	});
});
