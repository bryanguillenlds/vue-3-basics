import axios from 'axios';
import { type GiphyResponse } from '../interfaces/giphy-resp';

const apiKey = 'MwVx05WY78EyzaKrToBoLhHjNOfyEH3i';

export const giphyApi = axios.create({
	baseURL: 'https://api.giphy.com/v1/gifs',
	params: {
		api_key: apiKey,
	},
});

giphyApi.get<GiphyResponse>('/random').then(({ data }) => {
	console.log(data.data.images.downsized_medium.url);
});