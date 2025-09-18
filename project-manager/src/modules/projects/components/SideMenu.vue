<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4 mt-4">Projects</h2>
    <p
      v-if="projectsStore.noProjects"
      class="text-sm text-gray-500 mx-4 mt-2"
    >
      No projects yet
    </p>

    <ul
      v-else
      class="menu bg-base-200 rounded-box w-56"
    >
      <li
        v-for="project in projectsStore.projectList"
        :key="project.id"
      >
        <template v-if="project.tasks.length > 0">
          <details>
            <summary>
              <RouterLink :to="`/projects/${project.id}`">
                {{ project.name }}
              </RouterLink>
            </summary>
            <ul>
              <li
                v-for="task in project.tasks"
                :key="task.id"
              >
                <RouterLink :to="`/projects/${project.id}`">
                  {{ task.name }}
                </RouterLink>
              </li>
            </ul>
          </details>
        </template>

        <template v-else>
          <RouterLink :to="`/projects/${project.id}`">
            {{ project.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/modules/projects/store/projects.store';

const projectsStore = useProjectsStore();
</script>

<style scoped></style>
