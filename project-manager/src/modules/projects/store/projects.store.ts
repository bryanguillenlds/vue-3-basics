import { defineStore } from 'pinia';
import { type Project, type Task } from '../interfaces/project.interface';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  // useLocalStorage comes from the @vueuse/core package and allows us to store the projects in the browser's local storage
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const projectListWithProgress = computed(() => {
    return projects.value.map((project) => {
      const completedTasks = project.tasks.filter(
        (task) => task.completedAt
      ).length;

      const totalTasks = project.tasks.length;

      const progress =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

      return {
        ...project,
        progress
      };
    });
  });

  const addProject = (projectName: string) => {
    if (projectName.trim().length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      tasks: []
    });
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    // find the project that we are adding onto
    // add task to project and useLocalStorage will automatically update the projects
    const project = projects.value.find((p) => p.id === projectId);

    const payload = {
      id: uuidv4(),
      name: taskName.trim(),
      completedAt: null
    } as Task;

    if (project) {
      project.tasks.push(payload);
    }
  };

  const toggleTaskCompletion = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);

    const task = project?.tasks.find((t) => t.id === taskId);

    if (task) {
      task.completedAt = task.completedAt ? null : new Date();
    }
  };

  return {
    // Properties
    // projects,

    // Getters
    projectList: computed(() => [...projects.value]),
    projectListWithProgress,
    noProjects: computed(() => projects.value.length === 0),

    // Actions
    addProject,
    addTaskToProject,
    toggleTaskCompletion
  };
});
