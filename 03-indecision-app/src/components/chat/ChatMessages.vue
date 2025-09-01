<template>
	<div ref="chatRef" class="flex-1 overflow-y-auto p-4">
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
import { ref, watch } from 'vue';

interface Props {
	messages: ChatMessage[];
}

const props = defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);

/*
	Watch the messages array and scroll to the bottom when it changes
	IMPORTANT: We use a getter function () => props.messages instead of props.messages directly

	Why? Because:
	- Direct watching (watch(props.messages, ...)) watches the specific array object in memory
	- When setProps() is called in tests, Vue creates a NEW array at a different memory location
	- Direct watching misses this change because it's watching the old array
	- Getter watching (watch(() => props.messages, ...)) always checks the current value
	- This ensures we catch changes even when the array object is completely replaced
*/
watch(
	() => props.messages,
	() => {
		// We need a timeout to ensure the DOM is updated before scrolling
		setTimeout(() => {
			if (!chatRef.value) return;

			chatRef.value.scrollTo({
				top: chatRef.value.scrollHeight,
				behavior: 'smooth'
			});
		}, 100);
	},
	{ deep: true }
);
</script>
