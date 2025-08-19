export type Owner = 'DC' | 'Marvel';

export type Hero = {
	id: number;
	name: string;
	owner: Owner;
};


const heroes: Hero[] = [
	{
		id: 1,
		name: 'Batman',
		owner: 'DC'
	},
	{
		id: 2,
		name: 'Superman',
		owner: 'DC'
	},

	{
		id: 3,
		name: 'Flash',
		owner: 'DC'
	},

	{
		id: 4,
		name: 'Aquaman',
		owner: 'DC'
	},

	{
		id: 5,
		name: 'Green Lantern',
		owner: 'DC'
	},

	{
		id: 6,
		name: 'Martian Manhunter',
		owner: 'DC'
	},

	{
		id: 7,
		name: 'Shazam',
		owner: 'DC'
	},

	{
		id: 8,
		name: 'Wonder Woman',
		owner: 'DC'
	},
];

// Named exports are used to export multiple values from a module, the name when importing has to be the same
// and it has to be imported with curly braces.
export const owners = ['DC', 'Marvel'];

// Default exports are used to export a single value from a module (can only have one default per module), the name when importing can be different
// and it has to be imported without curly braces.
export default heroes;