import { shallowMount } from '@vue/test-utils';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { createTestingPinia } from '@pinia/testing';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { nextTick } from 'vue';

describe('SideMenu', () => {
  const wrapper = shallowMount(SideMenu, {
    global: {
      stubs: {
        RouterLink: true
      },
      plugins: [
        createTestingPinia({
          stubActions: false
        })
      ]
    }
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: []
    });
  });

  test('should render with no projects', () => {
    expect(wrapper.find('p').classes()).toContain('text-gray-500');
    expect(wrapper.find('p').text()).toBe('No projects yet');
  });

  test('should render with projects', async () => {
    store.addProject('Test Project 1');

    await nextTick();

    expect(wrapper.html()).not.toContain('No projects yet');
  });
});
