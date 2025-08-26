import type { ChatMessage } from '@/interfaces/chat-message-interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';
import { sleep } from '@/helpers/sleep';
import { ref } from 'vue';

export const useChat = () => {
	const messages = ref<ChatMessage[]>([]);

	const getChatGIFResponse = async (message: string) => {
		const response = await fetch(`https://yesno.wtf/api`);
		const { answer, image } = (await response.json()) as YesNoResponse;
		return {
			answer,
			image
		};
	};

	const onSendMessage = async (message: string) => {
		if (!message.trim().length) return;

		messages.value.push({
			id: new Date().getTime(),
			message,
			sentByMe: true,
			image: null
		});

		if (!message.endsWith('?')) {
			return;
		}

		await sleep(1.5); // Simulate a delay

		const { answer, image } = await getChatGIFResponse(message);

		messages.value.push({
			id: new Date().getTime(),
			message: answer,
			sentByMe: false,
			image
		});
	};

	return {
		messages,

		onSendMessage
	};
};
