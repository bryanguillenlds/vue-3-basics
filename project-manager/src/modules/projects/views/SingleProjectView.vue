<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :projectName="project?.name ?? ''" />
    </section>

    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Finished</th>
              <th>Task</th>
              <th>Completed On</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in project?.tasks"
              :key="task.id"
              class="hover:bg-base-300"
            >
              <th>2</th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>

            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <input
                  v-model="newTask"
                  type="text"
                  class="input input-primary w-full opacity-70 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="New Task"
                  @keyup.enter="onAddTaskToProject"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { computed, watch, ref } from 'vue';
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  id: string;
}

const router = useRouter();

const projectsStore = useProjectsStore();

const newTask = ref('');
const props = defineProps<Props>();

// We make it a computed so that it is reactive to changes
// when we click different projects and therefore the id changes
const project = computed(() =>
  projectsStore.projectList.find((project) => project.id === props.id)
);

// If projectsStore.projectList changes (project deleted)
// project computed becomes undefined, watch triggers navigation
// With only a watch, we would only detect changes in the id, not the projectList
// so we would not be able to redirect automatically if a project is deleted
watch(
  project,
  () => {
    if (!project.value) {
      router.replace({ name: 'projects' });
    }
  },
  { immediate: true }
);

const onAddTaskToProject = () => {
  if (!newTask.value.trim()) return;
  const payload = {
    id: uuidv4(),
    name: newTask.value.trim(),
    completedAt: null
  };

  projectsStore.addTaskToProject(props.id, payload);

  newTask.value = ''; //reset the input
};
</script>

<style scoped></style>
