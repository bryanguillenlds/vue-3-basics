import { mount } from '@vue/test-utils';
import SingleProjectView from '@/modules/projects/views/SingleProjectView.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { projectsMock } from '../../mocks/projects.mock';
import { useRouter } from 'vue-router';
import type { Mock } from 'vitest';

vi.mock('vue-router');
vi.mock('@/modules/projects/store/projects.store');

describe('SingleProjectView', () => {
  const mockUseProjectsStore = useProjectsStore as any;
  const mockUseRouter = useRouter as Mock;

  test('renders tasks for the given project', () => {
    mockUseProjectsStore.mockReturnValue({ projectList: projectsMock });

    const wrapper = mount(SingleProjectView, {
      props: { id: '1' },
      global: { stubs: ['RouterLink'] }
    });

    expect(wrapper.findAll('tr.hover\\:bg-base-300')).toHaveLength(
      projectsMock[0].tasks.length
    );
  });

  test('redirects when the project is missing', () => {
    const replaceSpy = vi.fn();
    mockUseProjectsStore.mockReturnValue({ projectList: [] });
    mockUseRouter.mockReturnValue({ replace: replaceSpy });

    mount(SingleProjectView, {
      props: { id: '1' },
      global: { stubs: ['RouterLink'] }
    });

    expect(replaceSpy).toHaveBeenCalledWith({ name: 'projects' });
  });
});
