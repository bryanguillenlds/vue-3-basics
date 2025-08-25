<template>
	<div class="flex-1 overflow-y-auto p-4">
		<div class="flex flex-col space-y-2">
			<!-- Messages go here -->
			<!-- Example Message -->
			<ChatBubble
				v-for="message in messages"
				:key="message.id"
				:message="message.message"
				:sentByMe="message.sentByMe"
				:image="message.image"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/interfaces/chat-message-interface';
import ChatBubble from '@/components/chat/chatBubble.vue';

interface Props {
	messages: ChatMessage[];
}

const props = defineProps<Props>();
</script>
