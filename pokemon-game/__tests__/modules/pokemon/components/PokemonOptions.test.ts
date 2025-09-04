import { mount } from '@vue/test-utils';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const options = [
  {
    name: 'pikachu',
    id: 1
  },
  {
    name: 'bulbasaur',
    id: 2
  },
  {
    name: 'charmander',
    id: 3
  }
];

describe('PokemonOptions', () => {
  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockedSelection: false,
        correctAnswer: 1
      }
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(options.length);
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(options[index].name);
    });
  });

  test('should emit the selected option when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockedSelection: false,
        correctAnswer: 1
      }
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach(async (button, index) => {
      await button.trigger('click');
      expect(wrapper.emitted('selectedOption')).toBeTruthy();
      expect(wrapper.emitted('selectedOption')?.[index]).toEqual([options[index].id]);
    });
  });

  test('should disable buttons when blockedSelection is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockedSelection: true,
        correctAnswer: 1
      }
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      const attributes = Object.keys(button.attributes());
      expect(attributes).toContain('disabled');
    });
  });

  test('should apply correct class when correctAnswer is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockedSelection: false,
        correctAnswer: 1
      }
    });

    const buttons = wrapper.findAll('button');

    const correctButton = buttons.filter((button) => button.attributes('id') === '1');

    correctButton.forEach((button) => {
      expect(button.attributes('class')).toContain('correct');
    });
  });

  test('should apply correct class when correctAnswer is false', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockedSelection: false,
        correctAnswer: 1
      }
    });

    const buttons = wrapper.findAll('button');

    const incorrectButton = buttons.filter((button) => button.attributes('id') === '2');

    incorrectButton.forEach((button) => {
      expect(button.attributes('class')).toContain('incorrect');
    });
  });
});
