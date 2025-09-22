import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { projectsMock } from '../../../mocks/projects.mock';
import { createPinia, setActivePinia } from 'pinia';

describe('useProjectsStore', () => {
  //Initialize the pinia store in a testing environment
  //because importing a store makes it so that pinia tries to find an
  //active instance, but the test environment doesn't have one
  //like our app does in main.ts
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should initialize with default values', () => {
    const projectsStore = useProjectsStore();

    expect(projectsStore.projectList).toEqual([]);
    expect(projectsStore.projectListWithProgress).toEqual([]);
    expect(projectsStore.noProjects).toBe(true);
    expect(projectsStore.addProject).toBeInstanceOf(Function);
    expect(projectsStore.addTaskToProject).toBeInstanceOf(Function);
    expect(projectsStore.toggleTaskCompletion).toBeInstanceOf(Function);
  });

  test('should add a project', () => {
    const projectsStore = useProjectsStore();
    const testProjectName = 'Test Project';

    projectsStore.addProject(testProjectName);

    expect(projectsStore.projectList).toHaveLength(1);

    expect(projectsStore.projectList).toEqual([
      { id: expect.any(String), name: testProjectName, tasks: [] }
    ]);
  });

  test('should load projects from local storage', () => {
    localStorage.setItem('projects', JSON.stringify(projectsMock));

    const projectsStore = useProjectsStore();
    const [project1] = projectsStore.projectList;

    expect(project1).toEqual({
      id: '1',
      name: 'Test Project 1',
      tasks: expect.any(Array)
    });

    expect(projectsStore.projectList).toHaveLength(projectsMock.length);
  });
});
