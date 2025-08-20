const { createApp, ref, computed } = Vue

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

		const newQuote = ref('');

		const showAuthor = ref(true);

		// At this point, quotes is not the original quotes array. it is wrapped by a ref that has a value property
		// value is the actual array. So we need to access the value property to get the original array.
		const totalQuotes = computed(() => {
			return quotes.value.length;
		});

		const addQuote = () => {
			quotes.value.push({
				quote: newQuote.value,
				author: 'Another Another Another John Doe'
			});

			newQuote.value = ''; //This is needed to clear the input field
		}

		return {
			quotes,
			showAuthor,
			newQuote,
			addQuote,
			totalQuotes
		}
	}
})

app.mount('#myApp')