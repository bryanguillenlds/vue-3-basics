import { getHeroeById } from '../bases/05-impExp';
import { type Hero } from '../data/heroes';

console.log('Start Synchronous code');

new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Asynchronous Resolve');
		// reject('Asynchronous Reject');
	}, 1000);
}).then(message => {
	console.log(message);
}).catch(error => {
	console.log(error);
}).finally(() => {
	console.log('Asynchronous Finally');
});

console.log('End Synchronous code');

const getHeroByIdAsync = (id: number): Promise<Hero> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const hero = getHeroeById(id)

			if (hero) {
				resolve(hero);
				return;
			}

			reject(`Hero with id ${id} not found`);

		}, 1500);
	});
};

getHeroByIdAsync(1).then(hero => {
	console.log('The hero is:', hero?.name);
}).catch(error => {
	console.log(error);
});

export {};