import type { Pokemon } from '@/modules/pokemon/interfaces/pokemon.interface';

describe('Pokemon Interface', () => {
  const pokemon: Pokemon = {
    name: 'pikachu',
    id: 1
  };

  test('should have a name and id', () => {
    expect(pokemon.name).toBe('pikachu');
    expect(pokemon.id).toBe(1);
  });
});
