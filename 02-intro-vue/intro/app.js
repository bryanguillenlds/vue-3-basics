const { createApp, ref } = Vue

const app = createApp({

	setup() {
		const message = ref('Hello World!!');
		const author = ref('John Doe');

		// setTimeout(() => {
		// 	message.value = 'Hello World!! 2';
		// 	author.value = 'Jane Doe';
		// }, 2000);

		const changeQuote = () => {
			message.value = 'Hello World!! 2';
			author.value = 'Jane Doe';
		}

		return {
			message,
			author,

			changeQuote
		}
	}
})

app.mount('#app')