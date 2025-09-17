import { defineStore } from 'pinia';
import { type Project } from '../interfaces/project.interface';
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

  return {
    // Properties
    // projects,

    // Getters
    projectList: computed(() => [...projects.value]),

    // Actions
    addProject
  };
});
