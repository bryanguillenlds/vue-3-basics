<template>
	<div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
		<div class="bg-blue-500 p-4 text-white flex justify-between items-center">
			<span>LIONESS DECIDER</span>
		</div>

		<ChatMessages :messages="messages" />

		<MessageBox @send-message="onSendMessage" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ChatMessage } from '@/interfaces/chat-message-interface';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';

const messages = ref<ChatMessage[]>([
	{
		id: new Date().getTime(),
		message: 'Hey, wanna hang out?',
		sentByMe: true,
		image: null
	},
	{
		id: new Date().getTime(),
		message: 'Sure, when?',
		sentByMe: false,
		image: 'https://yesno.wtf/assets/yes/11-a23cbde4ae018bbda812d2d8b2b8fc6c.gif'
	}
]);

const onSendMessage = (message: string) => {
	messages.value.push({
		id: new Date().getTime(),
		message,
		sentByMe: true,
		image: null
	});
};
</script>
