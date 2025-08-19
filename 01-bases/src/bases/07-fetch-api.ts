import { type GiphyResponse } from '../interfaces/giphy-resp';

const apiKey = 'MwVx05WY78EyzaKrToBoLhHjNOfyEH3i';

const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

fetch(url)
	.then(response => {
		console.log(response);
		return response.json();
	})
	.then((body: GiphyResponse) => {
		console.log(body.data.images.downsized_medium.url);
	})
	.catch(error => console.log(error));

export {};