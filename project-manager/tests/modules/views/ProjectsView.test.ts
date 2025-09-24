import { mount } from '@vue/test-utils';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { nextTick } from 'vue';
import { projectsMock } from '../../mocks/projects.mock';
import FabButton from '@/modules/common/FabButton.vue';

describe('ProjectsView', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [
        createTestingPinia({
          stubActions: false
        })
      ]
    }
  });

  const store = useProjectsStore();

  test('should render with projects', async () => {
    // You shouldn't be able to do this with a read-only property,
    // but unforunately createtestpinia doesn't offer another way to do this
    // and I don't want to use a real store in the tests because we are not
    // testing the store itself
    store.projectListWithProgress = projectsMock;

    await nextTick();

    const projectContainer = wrapper.findAll('tr');

    expect(projectContainer).toHaveLength(5);

    projectContainer.forEach((projectRow, index) => {
      const project = projectsMock[index];
      const projectProperties = projectRow.findAll('td');

      expect(projectProperties[1].text()).toBe(project.name);
      expect(projectProperties[2].text()).toBe(project.tasks.length.toString());
    });
  });

  test('should call addProject method on input modal save button click', async () => {
    const inputModal = wrapper.findComponent({ name: 'InputModal' });
    const newProjectName = 'Test Project';

    inputModal.vm.$emit('saveProject', newProjectName);

    expect(store.addProject).toHaveBeenCalledWith(newProjectName);
  });

  test('opens the input modal when the add FabButton is clicked', async () => {
    const [addButton] = wrapper.findAllComponents(FabButton);

    await addButton.trigger('click');
    await nextTick();

    expect(
      wrapper.findComponent({ name: 'InputModal' }).props('isModalOpen')
    ).toBe(true);
  });
});
