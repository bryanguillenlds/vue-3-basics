import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { mount } from '@vue/test-utils';

describe('PokemonPicture', () => {
  const pokemonId = 1;
  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  test('should render the opaque image when props showPokemon is false', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: false
      }
    });

    const img = wrapper.find('img');

    expect(img.exists()).toBe(true);
    expect(img.attributes('class')).toContain('brightness-0');
    expect(img.attributes('class')).not.toContain('fade-in');
    expect(img.attributes('src')).toContain(imageSrc);
  });

  test('should render the visible image when props showPokemon is true', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: true
      }
    });

    const img = wrapper.find('img');

    expect(img.exists()).toBe(true);
    expect(img.attributes('class')).toContain('fade-in');
    expect(img.attributes('class')).not.toContain('brightness-0');
    expect(img.attributes('src')).toContain(imageSrc);
  });
});
