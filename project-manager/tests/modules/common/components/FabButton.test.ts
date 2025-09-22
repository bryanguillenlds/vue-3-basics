import FabButton from '@/modules/common/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('FabButton', () => {
  test('renders with default position bottom-right', () => {
    const wrapper = shallowMount(FabButton);

    expect(wrapper.find('.bottom-right').exists()).toBe(true);
    expect(wrapper.props().position).toBe('bottom-right');
  });

  test('renders with custom position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left'
      }
    });

    expect(wrapper.find('.top-left').exists()).toBe(true);
    expect(wrapper.props().position).toBe('top-left');
  });

  test('renders slot content inside the component', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Hello, world!</span>'
      }
    });

    const slotContent = wrapper.find('button span');

    expect(slotContent.text()).toBe('Hello, world!');
  });
});
