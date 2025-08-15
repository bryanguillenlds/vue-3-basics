//Imported with and without curly braces respectively for named and default exports from another module
import heroes, { type Owner } from '../data/heroes';

console.log(heroes);

const getHeroeById = (id: number) => {
	return heroes.find(hero => hero.id === id);
};

const getHeroeByOwner = (owner: Owner) => {
	return heroes.filter(hero => hero.owner === owner);
};

console.log(getHeroeById(1));
console.log(getHeroeByOwner('DC'));

export {};