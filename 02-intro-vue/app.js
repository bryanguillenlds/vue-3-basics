const { createApp, ref } = Vue

const app = createApp({

	setup() {
		const quotes = ref([
			{
				quote: 'Hello World!!',
				author: 'John Doe'
			},
			{
				quote: 'Hello World!! 2',
				author: 'Jane Doe'
			},
			{
				quote: 'Hello World!! 3',
				author: 'Another John Doe'
			},
			{
				quote: 'Hello World!! 4',
				author: 'Another Jane Doe'
			},

			{
				quote: 'Hello World!! 5',
				author: 'Another Another John Doe'
			}
		]);

		const showAuthor = ref(true);

		return {
			quotes,
			showAuthor
		}
	}
})

app.mount('#myApp')