import { mount } from '@vue/test-utils';
import CustomModal from '@/modules/common/components/CustomModal.vue';

describe('CustomModal', () => {
  test('renders with default open false', () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: false
      }
    });

    expect(wrapper.find('.modal').attributes('open')).toBeUndefined();
    expect(wrapper.props().open).toBe(false);
  });

  test('should render dialog with named slots', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<h3>Header</h3>',
        body: '<p>Body</p>',
        actions: '<button>Actions</button>'
      }
    });

    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  test('should open and close when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true
      }
    });

    expect(wrapper.find('.modal').attributes('open')).toBeDefined();
    expect(wrapper.props().open).toBe(true);

    await wrapper.setProps({ open: false });

    expect(wrapper.find('.modal').attributes('open')).toBeUndefined();
    expect(wrapper.props().open).toBe(false);
  });

  test('should display backdrop when open is true', () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true
      }
    });

    expect(wrapper.find('.modal-backdrop').exists()).toBe(true);
  });
});
