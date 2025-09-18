import { defineStore } from 'pinia';
import { type Project, type Task } from '../interfaces/project.interface';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  // useLocalStorage comes from the @vueuse/core package and allows us to store the projects in the browser's local storage
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (projectName: string) => {
    if (projectName.trim().length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      tasks: []
    });
  };

  const addTaskToProject = (projectId: string, task: Task) => {
    // find the project that we are adding onto
    // add task to project and useLocalStorage will automatically update the projects
    const project = projects.value.find((project) => project.id === projectId);
    if (project) {
      project.tasks.push(task);
    }
  };

  return {
    // Properties
    // projects,

    // Getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),

    // Actions
    addProject,
    addTaskToProject
  };
});
