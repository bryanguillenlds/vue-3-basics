import type { GiphyResponse } from '../interfaces/giphy-resp';
import { giphyApi } from './08-axios';

export const getImage = async () => {
	try {
		const { data } = await giphyApi.get<GiphyResponse>('/random');
		return data.data.images.downsized_medium.url;
	} catch (error) {
		console.log('Error', error);
	}
};

getImage().then(console.log).catch(console.log);

export {};