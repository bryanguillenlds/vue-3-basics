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
              <td>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="onToggleTaskCompletion(task.id)"
                />
              </td>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>

            <tr>
              <th></th>
              <td>
                <input
                  type="text"
                  v-model="newTaskName"
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

interface Props {
  id: string;
}

const router = useRouter();

const projectsStore = useProjectsStore();

const newTaskName = ref('');

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
  if (!newTaskName.value.trim()) return;

  projectsStore.addTaskToProject(props.id, newTaskName.value);

  newTaskName.value = ''; //reset the input
};

const onToggleTaskCompletion = (taskId: string) => {
  projectsStore.toggleTaskCompletion(props.id, taskId);
};
</script>

<style scoped></style>
